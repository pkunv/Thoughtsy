create table
  public.users (
    uid uuid not null,
    display_name character varying null,
    created_at timestamp with time zone null,
    constraint users_pkey primary key (uid)
  ) tablespace pg_default;