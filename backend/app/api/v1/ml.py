from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Any, Dict
from datetime import datetime, timezone
from app.core.database import get_db
from app.core.config import settings
from app.models.user import User, PlanType
from app.models.usage import UsageLog
from app.services.auth import get_current_user

router = APIRouter(prefix="/ml", tags=["ml"])

PLAN_LIMITS = {
    PlanType.free: settings.FREE_MONTHLY_LIMIT,
    PlanType.pro: settings.PRO_MONTHLY_LIMIT,
    PlanType.enterprise: settings.ENTERPRISE_MONTHLY_LIMIT,
}


class PredictRequest(BaseModel):
    data: Dict[str, Any]
    model: str = "default"


def check_quota(db: Session, user: User):
    from sqlalchemy import func
    now = datetime.now(timezone.utc)
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    count = db.query(func.count(UsageLog.id)).filter(
        UsageLog.user_id == user.id,
        UsageLog.created_at >= month_start,
    ).scalar()
    limit = PLAN_LIMITS[user.plan]
    if count >= limit:
        raise HTTPException(
            status_code=429,
            detail=f"Monthly quota of {limit} calls exceeded. Please upgrade your plan."
        )


def log_usage(db: Session, user: User, endpoint: str, status_code: int = 200, response_time_ms: float = None):
    log = UsageLog(user_id=user.id, endpoint=endpoint, status_code=status_code, response_time_ms=response_time_ms)
    db.add(log)
    db.commit()


@router.post("/predict")
def predict(
    payload: PredictRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    check_quota(db, current_user)
    import time
    start = time.time()

    # -------------------------------------------------------
    # TODO: Replace with your actual ML inference logic here
    result = {"prediction": None, "confidence": 0.0, "model": payload.model}
    # -------------------------------------------------------

    elapsed = (time.time() - start) * 1000
    log_usage(db, current_user, "/ml/predict", 200, elapsed)
    return {"result": result, "usage": {"calls_this_request": 1}}


@router.get("/models")
def list_models(current_user: User = Depends(get_current_user)):
    """Returns available ML models for this user's plan."""
    models = [{"id": "default", "name": "Default Model", "description": "General-purpose ML model", "plan_required": "free"}]
    if current_user.plan in (PlanType.pro, PlanType.enterprise):
        models.append({"id": "advanced", "name": "Advanced Model", "description": "High-accuracy model", "plan_required": "pro"})
    if current_user.plan == PlanType.enterprise:
        models.append({"id": "custom", "name": "Custom Model", "description": "Your fine-tuned model", "plan_required": "enterprise"})
    return models
