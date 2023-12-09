-- supabase/seed.sql
--
-- create test users
INSERT INTO
  auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) (
    select
      '00000000-0000-0000-0000-000000000000',
      uuid_generate_v4 (),
      'authenticated',
      'authenticated',
      'user' || (ROW_NUMBER() OVER ()) || '@example.com',
      crypt ('123456', gen_salt ('bf')),
      current_timestamp,
      current_timestamp,
      current_timestamp,
      '{"provider":"email","providers":["email"]}',
      '{}',
      current_timestamp,
      current_timestamp,
      '',
      '',
      '',
      ''
    FROM
      generate_series(1, 2)
  );

-- test user email identities
INSERT INTO
  auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
    ) (
    select
      uuid_generate_v4 (),
      id,
      format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
      'email',
      current_timestamp,
      current_timestamp,
      current_timestamp
    from
      auth.users
  );

-- update test display names of test users
UPDATE
  public.users
    set display_name = au.email, created_at = au.created_at
  from auth.users au where uid = au.id; 

-- create public posts table
INSERT INTO
  public.posts (
    content,
    uid,
    active,
    created_at
  ) (
    select
      'test post content' || (ROW_NUMBER() OVER ()),
      uid,
      true,
      current_timestamp
    from
      public.users
  );

-- create public post_likes table
INSERT INTO
  public.post_likes (
    uid,
    post_id,
    created_at
  ) (
    select
      uid,
      id,
      current_timestamp
    from
      public.posts
  );
