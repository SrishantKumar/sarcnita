-- Create a new post_media table
CREATE TABLE IF NOT EXISTS post_media (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  media_url TEXT NOT NULL,
  media_type TEXT CHECK (media_type IN ('image', 'video')),
  display_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on post_media
ALTER TABLE post_media ENABLE ROW LEVEL SECURITY;

-- Create policies for post_media
CREATE POLICY "Public can view post media"
ON post_media FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can create post media"
ON post_media FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = (SELECT user_id FROM posts WHERE id = post_media.post_id));

CREATE POLICY "Users can update their own post media"
ON post_media FOR UPDATE
TO authenticated
USING (auth.uid() = (SELECT user_id FROM posts WHERE id = post_media.post_id))
WITH CHECK (auth.uid() = (SELECT user_id FROM posts WHERE id = post_media.post_id));

CREATE POLICY "Users can delete their own post media"
ON post_media FOR DELETE
TO authenticated
USING (auth.uid() = (SELECT user_id FROM posts WHERE id = post_media.post_id));

-- Migrate existing media to the new table
INSERT INTO post_media (post_id, media_url, media_type, display_order)
SELECT id, media_url, media_type, 0
FROM posts
WHERE media_url IS NOT NULL AND media_type IS NOT NULL;

-- Remove old media columns from posts table
ALTER TABLE posts DROP COLUMN IF EXISTS media_url;
ALTER TABLE posts DROP COLUMN IF EXISTS media_type;
