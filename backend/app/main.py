from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import Base, engine
from app.api.v1 import auth, api_keys, usage, billing, ml

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Abdo Research — ML as a Service",
    description="Professional ML inference API with subscription management",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1")
app.include_router(api_keys.router, prefix="/api/v1")
app.include_router(usage.router, prefix="/api/v1")
app.include_router(billing.router, prefix="/api/v1")
app.include_router(ml.router, prefix="/api/v1")


@app.get("/api/health")
def health():
    return {"status": "ok"}
