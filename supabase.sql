-- Run this in the Supabase SQL editor after creating the project.
-- Auth users are stored in auth.users. This public table stores profile data.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email
  )
  on conflict (id) do update
    set full_name = excluded.full_name,
        email = excluded.email,
        updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Admin accounts can manage research posts from the dashboard.
-- After your admin user signs up, add your email once:
-- insert into public.admin_users (email) values ('YOUR_EMAIL@example.com') on conflict (email) do nothing;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  email text unique,
  created_at timestamptz not null default now(),
  constraint admin_users_identity_check check (user_id is not null or email is not null)
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users admin_user
    where admin_user.user_id = auth.uid()
       or lower(admin_user.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

drop policy if exists "Admins can view admin users" on public.admin_users;

create policy "Admins can view admin users"
  on public.admin_users
  for select
  using (public.is_admin());

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references auth.users(id) on delete set null,
  title text not null,
  excerpt text not null,
  content text not null,
  tag text not null default 'بحثي',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.posts enable row level security;

drop policy if exists "Anyone can read published posts" on public.posts;
drop policy if exists "Admins can read all posts" on public.posts;
drop policy if exists "Admins can create posts" on public.posts;
drop policy if exists "Admins can update posts" on public.posts;
drop policy if exists "Admins can delete posts" on public.posts;

create policy "Anyone can read published posts"
  on public.posts
  for select
  using (status = 'published');

create policy "Admins can read all posts"
  on public.posts
  for select
  using (public.is_admin());

create policy "Admins can create posts"
  on public.posts
  for insert
  with check (public.is_admin() and author_id = auth.uid());

create policy "Admins can update posts"
  on public.posts
  for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete posts"
  on public.posts
  for delete
  using (public.is_admin());

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_touch_updated_at on public.posts;

create trigger posts_touch_updated_at
  before update on public.posts
  for each row execute function public.touch_updated_at();
