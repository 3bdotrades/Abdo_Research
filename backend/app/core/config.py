from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./abdo_research.db"
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    # Whop (payment processor — Apple Pay, card, etc.)
    WHOP_WEBHOOK_SECRET: str = ""
    WHOP_PRO_PLAN_ID: str = ""
    WHOP_ENTERPRISE_PLAN_ID: str = ""
    WHOP_PRO_CHECKOUT_URL: str = "https://whop.com/checkout/your-pro-plan"
    WHOP_ENTERPRISE_CHECKOUT_URL: str = "https://whop.com/checkout/your-enterprise-plan"

    FRONTEND_URL: str = "http://localhost:3000"
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    # Plan limits (API calls per month)
    FREE_MONTHLY_LIMIT: int = 100
    PRO_MONTHLY_LIMIT: int = 10000
    ENTERPRISE_MONTHLY_LIMIT: int = 1000000

    class Config:
        env_file = ".env"


settings = Settings()
