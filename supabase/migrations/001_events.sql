-- Supabase Dashboard > SQL Editor > New query > calistir

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  short_description text not null,
  start_date date not null,
  end_date date not null,
  city text not null,
  location text not null,
  level text not null,
  institution text not null,
  language text not null,
  link text not null,
  banner_image text not null default '',
  organizer jsonb not null default '{"name":""}',
  is_featured boolean not null default false,
  tags text[],
  social_media jsonb,
  created_at date not null default (timezone('utc', now()))::date
);

alter table public.events enable row level security;

drop policy if exists "events_select_all" on public.events;
drop policy if exists "events_insert_all" on public.events;
drop policy if exists "events_update_all" on public.events;
drop policy if exists "events_delete_all" on public.events;

-- Anon/authenticated JWT ile okuma/yazma (service_role RLS'i bypass eder)
create policy "events_select_all" on public.events for select using (true);
create policy "events_insert_all" on public.events for insert with check (true);
create policy "events_update_all" on public.events for update using (true);
create policy "events_delete_all" on public.events for delete using (true);
