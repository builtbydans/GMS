-- Immutable invoice snapshots generated from completed work items.

create sequence if not exists public.invoice_number_seq
  start with 1
  increment by 1;

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete restrict,
  status text not null default 'DRAFT',
  subtotal numeric(10, 2) not null default 0,
  discount numeric(10, 2) not null default 0,
  vat_rate numeric(5, 2) not null default 20,
  vat numeric(10, 2) not null default 0,
  total numeric(10, 2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.invoices
  add column if not exists invoice_number text,
  add column if not exists issued_at timestamptz,
  add column if not exists due_at timestamptz,
  add column if not exists paid_at timestamptz,
  add column if not exists voided_at timestamptz,
  add column if not exists deposit_paid numeric(10, 2) not null default 0,
  add column if not exists amount_paid numeric(10, 2) not null default 0,
  add column if not exists job_number text,
  add column if not exists customer_name text,
  add column if not exists customer_email text,
  add column if not exists customer_phone text,
  add column if not exists vehicle_registration text,
  add column if not exists vehicle_make text,
  add column if not exists vehicle_model text;

alter table public.invoices
  alter column invoice_number set default (
    'INV-' ||
    to_char(now(), 'YYYY') ||
    '-' ||
    lpad(nextval('public.invoice_number_seq')::text, 6, '0')
  );

do $$
declare
  max_existing_number bigint;
begin
  select max(substring(invoice_number from '([0-9]+)$')::bigint)
  into max_existing_number
  from public.invoices
  where invoice_number ~ '[0-9]+$';

  if max_existing_number is not null then
    perform setval(
      'public.invoice_number_seq',
      max_existing_number,
      true
    );
  end if;
end
$$;

update public.invoices
set invoice_number = (
  'INV-' ||
  to_char(coalesce(created_at, now()), 'YYYY') ||
  '-' ||
  lpad(nextval('public.invoice_number_seq')::text, 6, '0')
)
where invoice_number is null;

alter table public.invoices
  alter column invoice_number set not null;

create unique index if not exists invoices_job_id_unique
  on public.invoices (job_id);

create unique index if not exists invoices_invoice_number_unique
  on public.invoices (invoice_number);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'invoices_status_check'
      and conrelid = 'public.invoices'::regclass
  ) then
    alter table public.invoices
      add constraint invoices_status_check check (
        status in ('DRAFT', 'UNPAID', 'PAID', 'VOID')
      );
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'invoices_amounts_non_negative'
      and conrelid = 'public.invoices'::regclass
  ) then
    alter table public.invoices
      add constraint invoices_amounts_non_negative check (
        subtotal >= 0 and
        discount >= 0 and
        vat_rate >= 0 and
        vat >= 0 and
        total >= 0 and
        deposit_paid >= 0 and
        amount_paid >= 0
      );
  end if;
end
$$;

create table if not exists public.invoice_lines (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null
    references public.invoices(id)
    on delete cascade,
  source_work_item_id uuid
    references public.work_items(id)
    on delete set null,
  kind text not null,
  origin text not null,
  description text not null,
  quantity numeric(10, 2) not null,
  unit_price numeric(10, 2) not null,
  line_total numeric(10, 2) not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint invoice_lines_kind_check check (
    kind in ('LABOUR', 'PARTS', 'MATERIALS')
  ),
  constraint invoice_lines_origin_check check (
    origin in ('QUOTED', 'ADDITIONAL')
  ),
  constraint invoice_lines_amounts_valid check (
    quantity > 0 and unit_price >= 0 and line_total >= 0
  ),
  constraint invoice_lines_source_unique unique (
    invoice_id,
    source_work_item_id
  )
);

create index if not exists invoice_lines_invoice_id_idx
  on public.invoice_lines (invoice_id, sort_order, created_at);
