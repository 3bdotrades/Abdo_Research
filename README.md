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
4. Set the Supabase Auth Site URL to `https://abdo-research.vercel.app`.
5. Add these redirect URLs in Supabase Auth URL settings:
   - `https://abdo-research.vercel.app/dashboard`
   - `http://127.0.0.1:4173/dashboard`
6. Configure a custom SMTP provider in Supabase Auth SMTP settings for production email delivery.
7. Copy the project URL and anon public key into `auth-config.js`.

After this, signup creates a Supabase Auth user, sends the confirmation email, and creates/updates a protected `profiles` row.

Supabase's built-in email provider is only suitable for testing and can be blocked by authorization/rate-limit rules. Production signup confirmations should use custom SMTP, then Auth logs and the email provider logs should be checked if a message is not delivered.

## Local Preview

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/`.
