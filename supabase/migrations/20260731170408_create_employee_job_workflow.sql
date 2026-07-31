create table public.employees (
  id uuid primary key default gen_random_uuid(),

  first_name text not null,
  last_name text not null,

  role text not null,

  pin_hash text not null,
  active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,

  constraint employees_role_check check (
    role in (
      'MANAGER',
      'ADMIN',
      'TECHNICIAN'
    )
  )
);

create sequence public.job_number_seq
  start with 1
  increment by 1;

create table public.jobs (
  id uuid primary key default gen_random_uuid(),

  vehicle_id uuid not null
    references public.vehicles(id)
    on delete restrict,

  job_number text not null default (
    'JOB-' ||
    to_char(now(), 'YYYY') ||
    '-' ||
    lpad(nextval('public.job_number_seq')::text, 6, '0')
  ),

  job_type text,
  description text,

  status text not null default 'LEAD',

  quoted_cost numeric(10, 2),
  deposit_amount numeric(10, 2),
  deposit_received_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,

  constraint jobs_status_check check (
    status in (
      'LEAD',
      'QUOTED',
      'AWAITING_DEPOSIT',
      'BOOKED',
      'AWAITING_PARTS',
      'IN_PROGRESS',
      'AWAITING_REVIEW',
      'FINAL_INSPECTION',
      'READY_FOR_COLLECTION',
      'COMPLETED',
      'INVOICED',
      'PAID',
      'LOST'
    )
  ),

  constraint jobs_quoted_cost_non_negative check (
    quoted_cost is null or quoted_cost >= 0
  ),

  constraint jobs_deposit_amount_non_negative check (
    deposit_amount is null or deposit_amount >= 0
  )
);

create unique index jobs_job_number_unique
on public.jobs (job_number);

create table public.job_updates (
  id uuid primary key default gen_random_uuid(),

  job_id uuid not null
    references public.jobs(id)
    on delete cascade,

  message text not null,

  created_at timestamptz not null default now()
);
