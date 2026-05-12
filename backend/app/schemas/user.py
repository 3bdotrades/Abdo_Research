from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from app.models.user import PlanType


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    full_name: Optional[str] = None


class UserResponse(BaseModel):
    id: int
    email: str
    full_name: Optional[str]
    is_active: bool
    plan: PlanType
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse


class APIKeyCreate(BaseModel):
    name: str


class APIKeyResponse(BaseModel):
    id: int
    name: str
    key_prefix: str
    is_active: bool
    last_used_at: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True


class APIKeyCreated(APIKeyResponse):
    key: str  # only returned once at creation


class UsageStats(BaseModel):
    total_calls: int
    calls_this_month: int
    monthly_limit: int
    remaining_calls: int
    plan: PlanType
