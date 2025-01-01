-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create tables
create table if not exists profiles (
  id uuid references auth.users on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  role text check (role in ('admin', 'student')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

create table if not exists posts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade,
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
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists likes (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(post_id, user_id)
);

-- Create like function
create or replace function increment_likes(post_id uuid)
returns void as $$
begin
  insert into likes (post_id, user_id)
  values (post_id, auth.uid())
  on conflict (post_id, user_id) do nothing;
  
  update posts
  set likes_count = (
    select count(*) from likes where likes.post_id = posts.id
  )
  where id = post_id;
end;
$$ language plpgsql security definer;

-- Enable RLS
alter table profiles enable row level security;
alter table posts enable row level security;
alter table comments enable row level security;
alter table likes enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

create policy "Posts are viewable by everyone"
  on posts for select
  using ( true );

create policy "Authenticated users can create posts"
  on posts for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update own posts"
  on posts for update
  using ( auth.uid() = user_id );

create policy "Users can delete own posts or if admin"
  on posts for delete
  using (
    auth.uid() = user_id or
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Comments policies
create policy "Comments are viewable by everyone"
  on comments for select
  using ( true );

create policy "Authenticated users can create comments"
  on comments for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update own comments"
  on comments for update
  using ( auth.uid() = user_id );

create policy "Users can delete own comments or if admin"
  on comments for delete
  using (
    auth.uid() = user_id or
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Likes policies
create policy "Likes are viewable by everyone"
  on likes for select
  using ( true );

create policy "Authenticated users can create likes"
  on likes for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can delete own likes"
  on likes for delete
  using ( auth.uid() = user_id );
