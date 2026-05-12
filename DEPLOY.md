# Deployment Guide — tradezign.com

## Domain layout (recommended)

| URL | Service |
|---|---|
| `tradezign.com` | This website (FastAPI + React) |
| `app.tradezign.com` | Your existing dashboard (D:\Orderflow\qatar-ml\dashboard) |

## Step 1 — Deploy your existing dashboard

Host the Qatar-ML dashboard at a subdomain, e.g. `app.tradezign.com`.

**Critical:** your dashboard must allow being embedded in an iframe from `tradezign.com`.
Add these response headers to it:

```
Content-Security-Policy: frame-ancestors https://tradezign.com https://www.tradezign.com
X-Frame-Options: ALLOW-FROM https://tradezign.com
```

In most frameworks you can add this in middleware or nginx:
```nginx
add_header Content-Security-Policy "frame-ancestors https://tradezign.com";
```

## Step 2 — Configure the website

In `frontend/.env`:
```
VITE_DASHBOARD_URL=https://app.tradezign.com
```

In `backend/.env`:
```
FRONTEND_URL=https://tradezign.com
CORS_ORIGINS=["https://tradezign.com","https://www.tradezign.com"]
```

## Step 3 — Build and deploy the website

```bash
# Build frontend
cd frontend && npm run build   # outputs to dist/

# Run backend
cd backend && uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Serve `frontend/dist/` as a static site (Nginx, Vercel, Netlify, etc.).
Point the `/api` path to the backend.

## Step 4 — Whop setup

1. Go to https://whop.com → create two products: Pro ($49/mo) and Enterprise
2. Copy the checkout URLs into `backend/.env`:
   ```
   WHOP_PRO_CHECKOUT_URL=https://whop.com/checkout/...
   WHOP_ENTERPRISE_CHECKOUT_URL=https://whop.com/checkout/...
   ```
3. Set up webhook: `POST https://tradezign.com/api/v1/billing/webhook`
4. Copy webhook secret into `WHOP_WEBHOOK_SECRET`

## Nginx reverse proxy (example)

```nginx
server {
    listen 443 ssl;
    server_name tradezign.com www.tradezign.com;

    # Serve React build
    root /var/www/tradezign/frontend/dist;
    index index.html;

    # API proxy → FastAPI
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}

server {
    listen 443 ssl;
    server_name app.tradezign.com;

    # Your existing qatar-ml dashboard
    # ... proxy to your dashboard process
    add_header Content-Security-Policy "frame-ancestors https://tradezign.com https://www.tradezign.com";
}
```
