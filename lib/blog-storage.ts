import type { BlogPost } from '@/lib/types';

export const CUSTOM_BLOG_STORAGE_KEY = 'calistay-custom-blog-posts';
export const BLOG_POSTS_UPDATED_EVENT = 'calistay-blog-posts-updated';

export function parseCustomBlogPosts(raw: string | null): BlogPost[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as BlogPost[];
  } catch {
    return [];
  }
}

/** Özel yazılar önde; aynı slug varsa özelleştirilmiş sürüm geçerlidir. */
export function mergeBlogPosts(sample: BlogPost[], custom: BlogPost[]): BlogPost[] {
  const customSlugs = new Set(custom.map((p) => p.slug));
  const rest = sample.filter((p) => !customSlugs.has(p.slug));
  const sortedCustom = [...custom].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return [...sortedCustom, ...rest];
}

export function readCustomBlogPosts(): BlogPost[] {
  if (typeof window === 'undefined') return [];
  return parseCustomBlogPosts(localStorage.getItem(CUSTOM_BLOG_STORAGE_KEY));
}

export function writeCustomBlogPosts(posts: BlogPost[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CUSTOM_BLOG_STORAGE_KEY, JSON.stringify(posts));
}

export function notifyBlogPostsChanged(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(BLOG_POSTS_UPDATED_EVENT));
}

export function appendCustomBlogPost(post: BlogPost): void {
  const existing = readCustomBlogPosts();
  writeCustomBlogPosts([post, ...existing]);
  notifyBlogPostsChanged();
}

/** URL için basit Türkçe uyumlu slug (benzersizlik için tarih sufiksi eklemen gerek). */
export function slugifyTurkish(value: string): string {
  const folded = value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/İ/g, 'i')
    .replace(/ı/g, 'i')
    .toLowerCase();
  return folded
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function estimateReadTimeMinutes(markdownBody: string): number {
  const words = markdownBody.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
