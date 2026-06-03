# Abdo Research Static Site

Static Arabic landing site prepared for Vercel.

## Vercel Settings

- Framework preset: Other
- Build command: leave empty
- Output directory: `.`
- Install command: leave empty

The production entry point is `index.html`. `dashboard.html` is intentionally excluded from Vercel uploads until real private authentication is added.

## Local Preview

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/`.
