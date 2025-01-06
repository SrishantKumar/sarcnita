import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Post } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function useNitagramPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // First, get all posts with their basic info
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url
          ),
          comments (
            id,
            content,
            created_at,
            profiles:user_id (*)
          ),
          likes (user_id),
          media:post_media (
            id,
            media_url,
            media_type,
            display_order,
            created_at
          )
        `)
        .order('created_at', { ascending: false });

      if (postsError) {
        console.error('Error fetching posts:', postsError);
        setError(postsError.message);
        return;
      }

      if (!postsData) {
        setPosts([]);
        return;
      }

      // Sort media by display_order
      const postsWithSortedMedia = postsData.map(post => ({
        ...post,
        media: post.media?.sort((a, b) => a.display_order - b.display_order)
      }));

      setPosts(postsWithSortedMedia);
    } catch (error) {
      console.error('Error in fetchPosts:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = async (content: string, mediaFiles: File[]) => {
    try {
      if (!user) {
        throw new Error('User must be logged in to create a post');
      }

      // Create post first
      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert([{ user_id: user.id, content }])
        .select()
        .single();

      if (postError) throw postError;

      // Upload media files and create post_media entries
      const mediaPromises = mediaFiles.map(async (file, index) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${post.id}/${index}-${Math.random()}.${fileExt}`;
        const mediaType = file.type.startsWith('image/') ? 'image' : 'video';

        const { error: uploadError } = await supabase.storage
          .from('nitagram-media')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: mediaUrl } = supabase.storage
          .from('nitagram-media')
          .getPublicUrl(fileName);

        return {
          post_id: post.id,
          media_url: mediaUrl.publicUrl,
          media_type: mediaType,
          display_order: index
        };
      });

      const mediaResults = await Promise.all(mediaPromises);

      // Create post_media entries
      if (mediaResults.length > 0) {
        const { error: mediaError } = await supabase
          .from('post_media')
          .insert(mediaResults);

        if (mediaError) throw mediaError;
      }

      // Fetch the updated post with all relations
      const { data: updatedPost, error: fetchError } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url
          ),
          comments (
            id,
            content,
            created_at,
            profiles:user_id (*)
          ),
          likes (user_id),
          media:post_media (
            id,
            media_url,
            media_type,
            display_order,
            created_at
          )
        `)
        .eq('id', post.id)
        .single();

      if (fetchError) throw fetchError;

      setPosts(prevPosts => [updatedPost, ...prevPosts]);
    } catch (error) {
      console.error('Error in createPost:', error);
      throw error;
    }
  };

  const deletePost = async (postId: string) => {
    try {
      if (!user) return;

      // Delete post (this will cascade delete media entries)
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const likePost = async (postId: string) => {
    try {
      if (!user) return;

      const { data: existingLike } = await supabase
        .from('likes')
        .select()
        .match({ user_id: user.id, post_id: postId })
        .single();

      if (existingLike) {
        // Unlike
        await supabase
          .from('likes')
          .delete()
          .match({ user_id: user.id, post_id: postId });

        setPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === postId
              ? {
                  ...post,
                  likes: post.likes?.filter(like => like.user_id !== user.id) || [],
                  likes_count: Math.max(0, (post.likes_count || 1) - 1),
                }
              : post
          )
        );
      } else {
        // Like
        await supabase
          .from('likes')
          .insert({ user_id: user.id, post_id: postId });

        setPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === postId
              ? {
                  ...post,
                  likes: [...(post.likes || []), { user_id: user.id }],
                  likes_count: (post.likes_count || 0) + 1,
                }
              : post
          )
        );
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const addComment = async (postId: string, content: string) => {
    try {
      if (!user) return;

      const { data: comment, error: commentError } = await supabase
        .from('comments')
        .insert({
          user_id: user.id,
          post_id: postId,
          content,
        })
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url
          )
        `)
        .single();

      if (commentError) throw commentError;

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? {
                ...post,
                comments: [...(post.comments || []), comment],
                comments_count: (post.comments_count || 0) + 1,
              }
            : post
        )
      );
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Set up real-time subscription for posts
  useEffect(() => {
    const postsSubscription = supabase
      .channel('posts-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => {
      postsSubscription.unsubscribe();
    };
  }, [fetchPosts]);

  // Initial fetch
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    createPost,
    deletePost,
    likePost,
    addComment,
  };
}
