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

      // Then, for each post, get its likes and comments
      const postsWithDetails = await Promise.all(
        postsData.map(async (post) => {
          // Get likes
          const { data: likes } = await supabase
            .from('likes')
            .select('user_id')
            .eq('post_id', post.id);

          // Get comments
          const { data: comments } = await supabase
            .from('comments')
            .select(`
              *,
              profiles:user_id (
                username,
                avatar_url
              )
            `)
            .eq('post_id', post.id)
            .order('created_at', { ascending: true });

          return {
            ...post,
            likes: likes || [],
            likes_count: likes?.length || 0,
            comments: comments || [],
            comments_count: comments?.length || 0
          };
        })
      );

      setPosts(postsWithDetails);
    } catch (error) {
      console.error('Error in fetchPosts:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = async (content: string, mediaFile?: File) => {
    try {
      if (!user) {
        throw new Error('User must be logged in to create a post');
      }

      let mediaUrl = null;
      let mediaType = null;

      // Upload media if provided
      if (mediaFile) {
        const fileExt = mediaFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('nitagram-media')
          .upload(filePath, mediaFile);

        if (uploadError) {
          console.error('Error uploading file:', uploadError);
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from('nitagram-media')
          .getPublicUrl(filePath);

        mediaUrl = urlData.publicUrl;
        mediaType = mediaFile.type.startsWith('image/') ? 'image' : 'video';
      }

      // Create the post
      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert([
          {
            user_id: user.id,
            content,
            media_url: mediaUrl,
            media_type: mediaType,
          },
        ])
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url
          )
        `)
        .single();

      if (postError) {
        console.error('Error creating post:', postError);
        throw postError;
      }

      // Add the new post to the state with empty likes and comments
      setPosts((prevPosts) => [{
        ...post,
        likes: [],
        likes_count: 0,
        comments: [],
        comments_count: 0
      }, ...prevPosts]);

    } catch (error) {
      console.error('Error in createPost:', error);
      throw error;
    }
  };

  const deletePost = async (postId: string, userId: string) => {
    try {
      if (!user) return;

      const { error } = await supabase
        .from('posts')
        .delete()
        .match({ id: postId });

      if (error) throw error;

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
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

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes: post.likes?.filter((like) => like.user_id !== user.id) || [],
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

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
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

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
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
