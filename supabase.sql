-- Run this in the Supabase SQL editor after creating the project.
-- Auth users are stored in auth.users. This public table stores profile data.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  access_status text not null default 'pending',
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists access_status text not null default 'pending';
alter table public.profiles add column if not exists reviewed_at timestamptz;
alter table public.profiles add column if not exists reviewed_by uuid references auth.users(id) on delete set null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_access_status_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_access_status_check
      check (access_status in ('pending', 'approved', 'rejected'));
  end if;
end;
$$;

alter table public.profiles enable row level security;

drop policy if exists "Users can view their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;
drop policy if exists "Admins can view all profiles" on public.profiles;
drop policy if exists "Admins can update all profiles" on public.profiles;

create policy "Users can view their own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, access_status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email,
    'pending'
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

create policy "Admins can view all profiles"
  on public.profiles
  for select
  using (public.is_admin());

create policy "Admins can update all profiles"
  on public.profiles
  for update
  using (public.is_admin())
  with check (public.is_admin());

insert into public.admin_users (email)
values ('iabdoi2004@gmail.com')
on conflict (email) do nothing;

update public.profiles
set access_status = 'approved',
    reviewed_at = coalesce(reviewed_at, now())
where lower(email) = 'iabdoi2004@gmail.com';

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

insert into public.posts (id, title, excerpt, content, tag, status, published_at, created_at)
select *
from (
  values
    (
      '00000000-0000-4000-8000-000000000101'::uuid,
      $$لماذا تتفوق الأسهم القيادية السعودية في بيئات التضخم المرتفع؟$$,
      $$دراسة إحصائية على بيانات 8 سنوات تقارن أداء أسهم الطاقة والمواد الأساسية في تداول بالمؤشر العام خلال دورات التضخم من منظور العائد المعدل بالمخاطر.$$,
      $$تبدأ الفكرة من سؤال بسيط: هل تتحرك الأسهم القيادية بنفس الحساسية عندما تتغير بيئة التضخم، أم أن القطاعات المرتبطة بالتدفقات النقدية والسلع الأساسية تحتفظ بقدرة أفضل على امتصاص الصدمة؟

يعتمد التحليل على مقارنة العائد، التذبذب، والتراجع الأقصى عبر عينات زمنية متعددة. الهدف ليس تقديم توصية مباشرة، بل بناء إطار يساعد مدير المحفظة على فهم أين تظهر المتانة النسبية، ومتى تصبح العلاقة مجرد ضوضاء إحصائية.

النتيجة الأهم أن قراءة الأداء بمعزل عن المخاطر تعطي صورة ناقصة. لذلك يتم تقييم كل فترة عبر العائد المعدل بالمخاطر، وحجم التراجع، وثبات السلوك بين عينات التدريب والاختبار.$$,
      $$تحليل كمي$$,
      'published',
      now() - interval '18 days',
      now() - interval '18 days'
    ),
    (
      '00000000-0000-4000-8000-000000000102'::uuid,
      $$رصد تدفقات السيولة في البورصة المصرية: Q2 2026$$,
      $$رصد منهجي لتدفقات الأموال الأجنبية ومناطق التجميع الهادئ في أسهم EGX30 القيادية مع توثيق إحصائي كامل.$$,
      $$يركز هذا المنشور على فصل الحركة السعرية العادية عن مناطق التجميع التي تتكرر فيها أحجام تداول غير معتادة من دون اندفاع سعري واضح.

تمت مراجعة أسهم قيادية داخل EGX30 عبر أكثر من نافذة زمنية، مع مقارنة الحجم الحالي بمتوسطاته التاريخية وربطه بسلوك الإغلاق اليومي. الهدف هو تحديد الحالات التي تستحق متابعة بحثية أعمق، وليس إصدار إشارة شراء أو بيع.

عندما تتزامن الزيادة في الحجم مع انخفاض التذبذب واتساع المشاركة، يصبح الاحتمال البحثي أقوى، لكن القرار النهائي يحتاج دائما إلى قواعد مخاطر واضحة واختبار خارج العينة.$$,
      $$رصد سيولة$$,
      'published',
      now() - interval '14 days',
      now() - interval '14 days'
    ),
    (
      '00000000-0000-4000-8000-000000000103'::uuid,
      $$الميزة الإحصائية: لماذا نسبة النجاح 36% قد تكون أفضل من 70%؟$$,
      $$شرح رياضي لمفهوم Expected Value ولماذا لا تكفي نسبة النجاح وحدها لتقييم جودة أي نموذج أو قرار داخل المحفظة.$$,
      $$نسبة النجاح وحدها قد تكون مؤشرا مضللا. نموذج يربح في 70% من الحالات يمكن أن يخسر المال إذا كانت الخسائر أكبر بكثير من الأرباح، بينما نموذج بنسبة نجاح أقل قد يكون أكثر كفاءة إذا كانت الأرباح المتوسطة تعوض الخسائر.

لهذا السبب يبدأ تقييم أي نموذج من القيمة المتوقعة. يتم قياس متوسط الربح، متوسط الخسارة، احتمال حدوث كل منهما، ثم اختبار ثبات هذه العلاقة عبر فترات مختلفة.

المنهج المؤسسي لا يسأل فقط: كم مرة يربح النموذج؟ بل يسأل: ماذا يحدث عندما يخطئ؟ وهل تبقى الميزة قائمة بعد احتساب التكاليف والانزلاق السعري وحجم المركز؟$$,
      $$تعليمي$$,
      'published',
      now() - interval '10 days',
      now() - interval '10 days'
    ),
    (
      '00000000-0000-4000-8000-000000000104'::uuid,
      $$PDL Reclaim: كيف يعمل النموذج على البيانات التاريخية$$,
      $$شرح مفصل لنموذج Previous Day Low Reclaim وفكرته وسلوكه على بيانات تاريخية واسعة قبل اعتماده بحثيا.$$,
      $$يعتمد نموذج PDL Reclaim على مراقبة فشل السعر في الاستمرار أسفل قاع اليوم السابق، ثم دراسة احتمالية استعادة النطاق السابق تحت شروط حجم وتذبذب محددة.

الفكرة ليست مطاردة الارتداد، بل قياس نمط قابل للتكرار: هل عودة السعر فوق مستوى مرجعي بعد كسر مؤقت تعطي أفضلية قابلة للاختبار؟ تتم الإجابة عبر بيانات تاريخية، ثم اختبار خارج العينة، ثم مراجعة حساسية النموذج للتكاليف والانزلاق.

لا يتم اعتماد النموذج إلا إذا بقيت القواعد واضحة، وكانت النتائج مستقرة عبر أكثر من فترة وسوق، ولم تعتمد على عدد صغير من الصفقات الاستثنائية.$$,
      $$تعليمي$$,
      'published',
      now() - interval '7 days',
      now() - interval '7 days'
    ),
    (
      '00000000-0000-4000-8000-000000000105'::uuid,
      $$تحليل أداء Mean Reversion في سوق أبوظبي Q1 2026$$,
      $$تقرير ربع سنوي يستعرض أداء نموذج الانعكاس للمتوسط على أسهم سوق أبوظبي خلال الربع الأول من 2026.$$,
      $$يقيس هذا التقرير أداء نموذج انعكاس للمتوسط على أسهم مختارة من سوق أبوظبي، مع التركيز على جودة الإشارة بعد فترات الحركة الحادة.

تمت مراجعة نسب الفوز، متوسط العائد لكل صفقة، متوسط مدة الاحتفاظ، وأثر التذبذب على النتائج. كما تم فصل الفترات التي عمل فيها النموذج بوضوح عن الفترات التي انخفضت فيها الميزة.

الخلاصة البحثية أن نماذج الانعكاس تحتاج إلى فلتر للسياق. عندما يتحول السوق إلى اتجاه قوي، تصبح العودة للمتوسط أضعف، ويصبح ضبط المخاطر أكثر أهمية من تحسين نقطة الدخول وحدها.$$,
      $$تقرير$$,
      'published',
      now() - interval '5 days',
      now() - interval '5 days'
    ),
    (
      '00000000-0000-4000-8000-000000000106'::uuid,
      $$القيمة المتوقعة ولماذا WR 36% قد يتفوق على 70%$$,
      $$بحث يوضح لماذا Expected Value هو المقياس الحقيقي لجودة النظام، وليس نسبة الفوز وحدها.$$,
      $$يستخدم كثيرون نسبة الفوز كمؤشر سريع للحكم على أي استراتيجية، لكنها لا تكشف حجم الربح أو الخسارة أو أثر التكاليف. لذلك يمكن أن يبدو نموذج بنسبة فوز مرتفعة جذابا، ثم يفشل عند تطبيقه داخل محفظة حقيقية.

القيمة المتوقعة تجمع الاحتمال والحجم. إذا كان متوسط الربح أكبر بكثير من متوسط الخسارة، فقد تكون نسبة فوز أقل كافية لإنتاج نظام أفضل. والعكس صحيح عندما تكون الخسائر كبيرة ومتكررة.

أي تقييم مهني يحتاج إلى ربط القيمة المتوقعة بالتراجع الأقصى، حجم المركز، وسيولة السوق. عندها فقط يصبح الحكم على النموذج أقرب إلى إدارة محفظة لا إلى قراءة رقم واحد معزول.$$,
      $$بحثي$$,
      'published',
      now() - interval '3 days',
      now() - interval '3 days'
    )
) as seed(id, title, excerpt, content, tag, status, published_at, created_at)
on conflict (id) do nothing;

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

drop trigger if exists profiles_touch_updated_at on public.profiles;

create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

notify pgrst, 'reload schema';
