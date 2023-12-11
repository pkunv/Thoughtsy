CREATE EXTENSION IF NOT EXISTS moddatetime
	SCHEMA "extensions";

create table
  public.users (
    uid uuid not null,
    display_name character varying null,
    created_at timestamp with time zone null,
    modified_at timestamp with time zone null,
    constraint users_pkey primary key (uid)
  ) tablespace pg_default;

create trigger handle_users_updated_at before
update on users for each row
execute function moddatetime ('modified_at');