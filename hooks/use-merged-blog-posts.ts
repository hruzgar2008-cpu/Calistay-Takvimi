'use client';

import { useEffect, useState } from 'react';
import type { BlogPost } from '@/lib/types';
import {
  BLOG_POSTS_UPDATED_EVENT,
  mergeBlogPosts,
  readCustomBlogPosts,
} from '@/lib/blog-storage';

export function useMergedBlogPosts(sample: BlogPost[]): BlogPost[] {
  const [posts, setPosts] = useState<BlogPost[]>(sample);

  useEffect(() => {
    function load() {
      const custom = readCustomBlogPosts();
      setPosts(mergeBlogPosts(sample, custom));
    }
    load();
    window.addEventListener('storage', load);
    window.addEventListener(BLOG_POSTS_UPDATED_EVENT, load);
    return () => {
      window.removeEventListener('storage', load);
      window.removeEventListener(BLOG_POSTS_UPDATED_EVENT, load);
    };
  }, [sample]);

  return posts;
}
