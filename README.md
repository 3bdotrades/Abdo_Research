# Abdo Research Static Site

Static Arabic landing site prepared for Vercel with Supabase Auth wiring.

## Vercel Settings

- Framework preset: Other
- Build command: leave empty
- Output directory: `.`
- Install command: leave empty

The production entry point is `index.html`. The member area is available at `/dashboard` and checks for a Supabase session before showing the UI.

## Supabase Auth Setup

1. Create a Supabase project.
2. Open the Supabase SQL editor and run `supabase.sql`.
3. In Supabase Auth settings, keep email confirmations enabled.
4. Add these redirect URLs in Supabase Auth URL settings:
   - `https://abdo-research.vercel.app/dashboard`
   - `http://127.0.0.1:4173/dashboard`
5. Copy the project URL and anon public key into `auth-config.js`.

After this, signup creates a Supabase Auth user, sends the confirmation email, and creates/updates a protected `profiles` row.

## Local Preview

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/`.
