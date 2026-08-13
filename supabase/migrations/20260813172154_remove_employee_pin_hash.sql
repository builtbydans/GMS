-- Auth owns login; drop the unused plaintext PIN column.
alter table public.employees
  drop column if exists pin_hash;
