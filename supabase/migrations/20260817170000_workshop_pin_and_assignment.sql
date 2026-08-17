-- Shop-floor PIN (hashed at the API) and job technician assignment.

alter table public.employees
  add column if not exists pin_hash text;

alter table public.jobs
  add column if not exists assigned_technician_id uuid
    references public.employees(id)
    on delete set null;

create index if not exists jobs_assigned_technician_id_idx
  on public.jobs (assigned_technician_id)
  where deleted_at is null;
