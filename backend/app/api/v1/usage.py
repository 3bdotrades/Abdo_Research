from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timezone
from app.core.database import get_db
from app.core.config import settings
from app.models.user import User, PlanType
from app.models.usage import UsageLog
from app.schemas.user import UsageStats
from app.services.auth import get_current_user

router = APIRouter(prefix="/usage", tags=["usage"])

PLAN_LIMITS = {
    PlanType.free: settings.FREE_MONTHLY_LIMIT,
    PlanType.pro: settings.PRO_MONTHLY_LIMIT,
    PlanType.enterprise: settings.ENTERPRISE_MONTHLY_LIMIT,
}


@router.get("/stats", response_model=UsageStats)
def get_usage_stats(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    now = datetime.now(timezone.utc)
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

    total = db.query(func.count(UsageLog.id)).filter(UsageLog.user_id == current_user.id).scalar()
    this_month = db.query(func.count(UsageLog.id)).filter(
        UsageLog.user_id == current_user.id,
        UsageLog.created_at >= month_start,
    ).scalar()

    limit = PLAN_LIMITS[current_user.plan]
    return UsageStats(
        total_calls=total,
        calls_this_month=this_month,
        monthly_limit=limit,
        remaining_calls=max(0, limit - this_month),
        plan=current_user.plan,
    )


@router.get("/history")
def get_usage_history(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    logs = db.query(UsageLog).filter(UsageLog.user_id == current_user.id).order_by(
        UsageLog.created_at.desc()
    ).limit(100).all()
    return [{"endpoint": l.endpoint, "status_code": l.status_code, "response_time_ms": l.response_time_ms, "created_at": l.created_at} for l in logs]
