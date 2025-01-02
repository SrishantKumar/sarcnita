-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create tables if they don't exist (instead of dropping and recreating)
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  full_name text,
  avatar_url text,
  role text default 'student' check (role in ('admin', 'student')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists posts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  media_url text,
  media_type text check (media_type in ('image', 'video')),
  space text,
  likes_count integer default 0,
  comments_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists comments (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references posts(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists likes (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references posts(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(post_id, user_id)
);

create table if not exists newsletters (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  file_url text not null,
  uploaded_by uuid references profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table profiles enable row level security;
alter table posts enable row level security;
alter table comments enable row level security;
alter table likes enable row level security;
alter table newsletters enable row level security;

-- Create bucket for media files
insert into storage.buckets (id, name)
values ('nitagram-media', 'nitagram-media'),
       ('newsletter-files', 'newsletter-files')
on conflict (id) do nothing;

-- Enable RLS on storage
alter table storage.objects enable row level security;

-- Drop all existing policies first
drop policy if exists "Public profiles are viewable by everyone" on profiles;
drop policy if exists "Users can insert their own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;

drop policy if exists "Allow public read access" on posts;
drop policy if exists "Allow authenticated users to create posts" on posts;
drop policy if exists "Allow users to update their own posts" on posts;
drop policy if exists "Allow users to delete their own posts" on posts;
drop policy if exists "Allow admins to delete any post" on posts;

drop policy if exists "Comments are viewable by everyone" on comments;
drop policy if exists "Authenticated users can create comments" on comments;
drop policy if exists "Users can update own comments" on comments;
drop policy if exists "Users can delete own comments or if admin" on comments;

drop policy if exists "Likes are viewable by everyone" on likes;
drop policy if exists "Authenticated users can create likes" on likes;
drop policy if exists "Users can delete own likes" on likes;

drop policy if exists "Allow public read access" on newsletters;
drop policy if exists "Allow admin to manage newsletters" on newsletters;

-- Drop storage policies
drop policy if exists "Media files are publicly accessible" on storage.objects;
drop policy if exists "Any authenticated user can upload media" on storage.objects;
drop policy if exists "Users can update own media" on storage.objects;
drop policy if exists "Users can delete own media" on storage.objects;

-- Create policies for profiles
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Create policies for posts
CREATE POLICY "Public can view posts"
ON posts FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can create posts"
ON posts FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
ON posts FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts"
ON posts FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create policies for comments
CREATE POLICY "Public can view comments"
ON comments FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can create comments"
ON comments FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
ON comments FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
ON comments FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create policies for likes
CREATE POLICY "Public can view likes"
ON likes FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can manage their likes"
ON likes FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create policies for newsletters
CREATE POLICY "Public can view newsletters"
ON newsletters FOR SELECT
TO public
USING (true);

CREATE POLICY "Only admins can manage newsletters"
ON newsletters FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Create storage policies
create policy "Media files are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'nitagram-media' OR bucket_id = 'newsletter-files' );

create policy "Any authenticated user can upload media"
  on storage.objects for insert
  with check (
    auth.role() = 'authenticated' and
    (bucket_id = 'nitagram-media' OR 
     (bucket_id = 'newsletter-files' AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )))
  );

create policy "Users can update own media"
  on storage.objects for update
  using (
    bucket_id = 'nitagram-media' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can delete own media"
  on storage.objects for delete
  using (
    bucket_id = 'nitagram-media' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create auto-profile function
create or replace function public.handle_new_user()
returns trigger as $$
declare
  base_username text;
  final_username text;
  counter integer;
begin
  -- Get base username from email
  base_username := split_part(new.email, '@', 1);
  final_username := base_username;
  counter := 1;
  
  -- Keep trying with numbered suffixes until we find a unique username
  while exists (select 1 from public.profiles where username = final_username) loop
    final_username := base_username || counter::text;
    counter := counter + 1;
  end loop;

  insert into public.profiles (id, username, role)
  values (
    new.id,
    final_username,
    case
      when new.email = 'admin@sarcnita.com' then 'admin'
      else 'student'
    end
  )
  on conflict (id) do update
  set 
    username = excluded.username,
    role = case
      when new.email = 'admin@sarcnita.com' then 'admin'
      else 'student'
    end;
  return new;
end;
$$ language plpgsql security definer;

-- Drop existing trigger if it exists
drop trigger if exists on_auth_user_created on auth.users;

-- Create trigger for new users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to ensure all users have profiles
create or replace function ensure_user_profiles()
returns void as $$
declare
  user_record record;
  base_username text;
  final_username text;
  counter integer;
begin
  for user_record in 
    select 
      users.id,
      users.email,
      case
        when users.email = 'admin@sarcnita.com' then 'admin'
        else 'student'
      end as role
    from auth.users
    where not exists (
      select 1 from public.profiles where profiles.id = users.id
    )
  loop
    -- Get base username from email
    base_username := split_part(user_record.email, '@', 1);
    final_username := base_username;
    counter := 1;
    
    -- Keep trying with numbered suffixes until we find a unique username
    while exists (select 1 from public.profiles where username = final_username) loop
      final_username := base_username || counter::text;
      counter := counter + 1;
    end loop;

    -- Insert the profile with unique username
    insert into public.profiles (id, username, role)
    values (user_record.id, final_username, user_record.role);
  end loop;
end;
$$ language plpgsql security definer;

-- Run the function to create missing profiles
select ensure_user_profiles();

-- Create like function
create or replace function increment_likes(post_id uuid)
returns void as $$
begin
  if exists (
    select 1 from likes 
    where likes.post_id = increment_likes.post_id 
    and likes.user_id = auth.uid()
  ) then
    -- Unlike: Remove the like
    delete from likes 
    where likes.post_id = increment_likes.post_id 
    and likes.user_id = auth.uid();
  else
    -- Like: Add new like
    insert into likes (post_id, user_id)
    values (post_id, auth.uid());
  end if;
  
  -- Update likes count
  update posts
  set likes_count = (
    select count(*) from likes where likes.post_id = posts.id
  )
  where id = post_id;
end;
$$ language plpgsql security definer;

-- Function to set user role
create or replace function set_user_role(user_email text, new_role text)
returns void as $$
begin
  update profiles
  set role = new_role
  where id = (
    select id
    from auth.users
    where email = user_email
  );
end;
$$ language plpgsql security definer;

-- Function to ensure admin user exists and has admin role
create or replace function ensure_admin_user(admin_email text)
returns void as $$
declare
  admin_id uuid;
begin
  -- Get the admin user ID
  select id into admin_id from auth.users where email = admin_email;
  
  if admin_id is not null then
    -- Insert or update the admin profile
    insert into profiles (id, username, full_name, role)
    values (
      admin_id,
      split_part(admin_email, '@', 1),
      'Admin User',
      'admin'
    )
    on conflict (id) do update
    set role = 'admin';
  end if;
end;
$$ language plpgsql security definer;

-- Ensure admin user exists and has admin role
select ensure_admin_user('admin@sarcnita.com');

-- Storage setup
insert into storage.buckets (id, name, public)
values ('nitagram-media', 'nitagram-media', true),
       ('newsletter-files', 'newsletter-files', true)
on conflict (id) do nothing;
