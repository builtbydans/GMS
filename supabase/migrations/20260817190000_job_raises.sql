-- Technician attention requests for managers. One OPEN raise per job.

create table public.job_raises (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null
    references public.jobs(id)
    on delete cascade,
  raised_by_employee_id uuid not null
    references public.employees(id)
    on delete restrict,
  status text not null default 'OPEN',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  acknowledged_at timestamptz,
  acknowledged_by_employee_id uuid
    references public.employees(id)
    on delete set null,
  resolved_at timestamptz,
  resolved_by_employee_id uuid
    references public.employees(id)
    on delete set null,
  constraint job_raises_status_check check (
    status in ('OPEN', 'ACKNOWLEDGED', 'RESOLVED')
  )
);

create unique index job_raises_one_open_per_job
  on public.job_raises (job_id)
  where status = 'OPEN';

create index job_raises_open_updated_idx
  on public.job_raises (updated_at desc)
  where status = 'OPEN';

create table public.job_raise_notes (
  id uuid primary key default gen_random_uuid(),
  raise_id uuid not null
    references public.job_raises(id)
    on delete cascade,
  employee_id uuid not null
    references public.employees(id)
    on delete restrict,
  body text not null,
  created_at timestamptz not null default now()
);

create index job_raise_notes_raise_id_idx
  on public.job_raise_notes (raise_id, created_at);
