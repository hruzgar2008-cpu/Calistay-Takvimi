'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogCard } from './blog-card';
import { sampleBlogPosts } from '@/lib/data';
import { useMergedBlogPosts } from '@/hooks/use-merged-blog-posts';

export function BlogPreview() {
  const posts = useMergedBlogPosts(sampleBlogPosts);
  const featuredPost = posts.find((p) => p.isTrending) || posts[0];
  const otherPosts = posts.filter((p) => p.id !== featuredPost?.id).slice(0, 3);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Blog</span>
            </div>
            <h2 className="text-2xl font-bold md:text-3xl">Rehberler ve Ipuclari</h2>
          </div>
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/blog">
              Tum Yazilar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Featured Post */}
          {featuredPost && (
            <BlogCard post={featuredPost} variant="featured" />
          )}

          {/* Other Posts */}
          <div className="grid gap-4">
            {otherPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/blog">
              Tum Blog Yazilari
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
