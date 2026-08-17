-- Optional workshop notes attached to each job status update.

alter table public.job_updates
  add column if not exists note text;
