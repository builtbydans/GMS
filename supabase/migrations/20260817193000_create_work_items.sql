-- Actual labour, parts and materials on a job. Quoted cost stays on jobs.

alter table public.jobs
  add column if not exists actual_cost numeric(10, 2);

alter table public.jobs
  drop constraint if exists jobs_actual_cost_non_negative;

alter table public.jobs
  add constraint jobs_actual_cost_non_negative check (
    actual_cost is null or actual_cost >= 0
  );

create table public.work_items (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null
    references public.jobs(id)
    on delete cascade,
  kind text not null,
  origin text not null default 'QUOTED',
  description text not null,
  quantity numeric(10, 2) not null,
  unit_cost numeric(10, 2) not null default 0,
  unit_price numeric(10, 2) not null,
  sort_order integer not null default 0,
  created_by_employee_id uuid
    references public.employees(id)
    on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint work_items_kind_check check (
    kind in ('LABOUR', 'PARTS', 'MATERIALS')
  ),
  constraint work_items_origin_check check (
    origin in ('QUOTED', 'ADDITIONAL')
  ),
  constraint work_items_quantity_positive check (quantity > 0),
  constraint work_items_unit_cost_non_negative check (unit_cost >= 0),
  constraint work_items_unit_price_non_negative check (unit_price >= 0)
);

create index work_items_job_id_idx
  on public.work_items (job_id, sort_order, created_at);
