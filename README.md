# Abdo Research — ML as a Service

Full-stack ML-as-a-Service platform: public website + subscriber dashboard.

**Stack:** FastAPI · SQLAlchemy · React 18 · Vite · Tailwind CSS · Whop (billing/Apple Pay)

## Structure

```
├── backend/          FastAPI app
│   └── app/
│       ├── api/v1/   auth, api_keys, usage, billing, ml
│       ├── core/     config, security, database
│       ├── models/   SQLAlchemy models
│       └── schemas/  Pydantic schemas
└── frontend/         React app
    └── src/
        ├── pages/public/    Home, Pricing, Docs, Blog, RiskDisclosure, Login, Register
        └── pages/dashboard/ Overview, APIKeys, Usage, Billing, Playground, Settings
```

## Quick start

```bash
# Backend (SQLite for dev)
cd backend && pip install -r requirements.txt
cp .env.example .env   # fill in Whop keys
uvicorn app.main:app --reload

# Frontend
cd frontend && npm install && npm run dev
```

## Environment variables

See `backend/.env.example` for required variables.

## Whop setup (billing / Apple Pay)

1. Create a Whop account at https://whop.com
2. Create two products: **Pro** and **Enterprise**
3. Copy the checkout URLs into `.env`
4. Set up a webhook endpoint: `POST /api/v1/billing/webhook`
5. Copy the webhook secret into `.env`
