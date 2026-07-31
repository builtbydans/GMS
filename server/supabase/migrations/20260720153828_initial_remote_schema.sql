create table public.customers (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  phone text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null
    references public.customers(id),
    on delete restrict,
  registration text not null,
  make text not null,
  model text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create unique index customers_email_unique_active
on public.customers (lower(email))
where email is not null
and deleted_at is null;

create unique index vehicles_registration_unique_active
on public.vehicles (
  upper(replace(registration, ' ', ''))
)
where deleted_at is null;
