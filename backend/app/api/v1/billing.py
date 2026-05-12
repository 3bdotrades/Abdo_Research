"""
Billing via Whop (https://whop.com) — supports Apple Pay, credit card, etc.
Whop handles the checkout page, payment processing, and subscription lifecycle.
We receive webhooks to sync the user's plan.
"""
from fastapi import APIRouter, Depends, HTTPException, Request, Header
from sqlalchemy.orm import Session
from typing import Optional
import hmac, hashlib, json
from app.core.database import get_db
from app.core.config import settings
from app.models.user import User, PlanType
from app.services.auth import get_current_user

router = APIRouter(prefix="/billing", tags=["billing"])

# Map your Whop product/plan IDs to internal plan names
WHOP_PLAN_MAP: dict[str, PlanType] = {
    settings.WHOP_PRO_PLAN_ID: PlanType.pro,
    settings.WHOP_ENTERPRISE_PLAN_ID: PlanType.enterprise,
}


@router.get("/checkout/{plan}")
def get_checkout_url(
    plan: str,
    current_user: User = Depends(get_current_user),
):
    """Returns the Whop checkout URL for a given plan."""
    url_map = {
        "pro": settings.WHOP_PRO_CHECKOUT_URL,
        "enterprise": settings.WHOP_ENTERPRISE_CHECKOUT_URL,
    }
    url = url_map.get(plan)
    if not url:
        raise HTTPException(status_code=400, detail="Invalid plan")

    # Append metadata so Whop can pass it back in the webhook
    return {"url": f"{url}?metadata[user_id]={current_user.id}"}


@router.post("/webhook")
async def whop_webhook(
    request: Request,
    x_whop_signature: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    payload = await request.body()

    # Verify Whop webhook signature
    if settings.WHOP_WEBHOOK_SECRET:
        expected = hmac.new(
            settings.WHOP_WEBHOOK_SECRET.encode(),
            payload,
            hashlib.sha256,
        ).hexdigest()
        if not hmac.compare_digest(expected, x_whop_signature or ""):
            raise HTTPException(status_code=400, detail="Invalid webhook signature")

    event = json.loads(payload)
    event_type = event.get("event")
    data = event.get("data", {})

    if event_type in ("membership.went_valid", "membership.was_renewed"):
        user_id = data.get("metadata", {}).get("user_id")
        plan_id = data.get("plan_id") or data.get("product_id")
        if user_id and plan_id:
            user = db.query(User).filter(User.id == int(user_id)).first()
            if user:
                user.plan = WHOP_PLAN_MAP.get(plan_id, PlanType.free)
                user.whop_membership_id = data.get("id")
                db.commit()

    elif event_type in ("membership.went_invalid", "membership.expired"):
        user_id = data.get("metadata", {}).get("user_id")
        if user_id:
            user = db.query(User).filter(User.id == int(user_id)).first()
            if user:
                user.plan = PlanType.free
                user.whop_membership_id = None
                db.commit()

    return {"received": True}
