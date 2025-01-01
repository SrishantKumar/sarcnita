-- Create storage bucket
insert into storage.buckets (id, name, public)
values ('nitagram-media', 'nitagram-media', true);

-- Set up storage policies
create policy "Media files are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'nitagram-media' );

create policy "Authenticated users can upload media"
  on storage.objects for insert
  with check (
    bucket_id = 'nitagram-media' and
    auth.role() = 'authenticated'
  );

create policy "Users can update own media"
  on storage.objects for update
  using (
    bucket_id = 'nitagram-media' and
    auth.uid() = owner
  );

create policy "Users can delete own media or if admin"
  on storage.objects for delete
  using (
    bucket_id = 'nitagram-media' and
    (
      auth.uid() = owner or
      exists (
        select 1 from profiles
        where profiles.id = auth.uid()
        and profiles.role = 'admin'
      )
    )
  );
