create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),

  entity_type text not null,
  entity_id uuid not null,
  action text not null,
  old_value jsonb,
  new_value jsonb,
  created_by uuid,

  created_at timestamptz not null default now()
);
