create table public.invoices (
  id uuid primary key default gen_random_uuid(),

  job_id uuid not null
    references public.jobs(id)
    on delete restrict,

  invoice_number text not null default generate_invoice_number(),

  issued_by uuid
    references public.employees(id)
    on delete set null,

  subtotal numeric(10, 2) not null,
  vat_rate numeric(10, 2) not null default 20.00,
  vat numeric(10, 2) not null,
  total numeric(10, 2) not null,

  status text not null default 'DRAFT',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  discount numeric(10, 2) not null default 0
);
