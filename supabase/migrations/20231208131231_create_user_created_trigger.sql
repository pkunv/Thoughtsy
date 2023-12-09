create function handle_new_user() 
returns trigger as $$
begin
  insert into public.users (uid)
  values (new.id);
  return new;
end;$$ language plpgsql security definer;


create trigger on_auth_user_created
after insert on auth.users for each row
execute function handle_new_user ();