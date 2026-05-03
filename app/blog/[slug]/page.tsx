'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, User, Share2, BookOpen } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BlogCard } from '@/components/blog-card';
import { sampleBlogPosts } from '@/lib/data';
import { useMergedBlogPosts } from '@/hooks/use-merged-blog-posts';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const mergedPosts = useMergedBlogPosts(sampleBlogPosts);

  const post = useMemo(
    () => mergedPosts.find((p) => p.slug === slug),
    [mergedPosts, slug],
  );

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return mergedPosts.filter((p) => p.id !== post.id).slice(0, 3);
  }, [mergedPosts, post]);

  const htmlBody = post
    ? post.content
        .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-medium mt-4 mb-2">$1</h3>')
        .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
        .replace(/\n\n/g, '</p><p class="my-4">')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    : '';

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {!post ? (
          <section className="py-24 text-center">
            <div className="container mx-auto px-4">
              <p className="mb-6 text-muted-foreground">Bu yazi bulunamadi.</p>
              <Button asChild variant="outline">
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Blog&apos;a don
                </Link>
              </Button>
            </div>
          </section>
        ) : (
          <>
            {/* Header */}
            <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
              <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl">
                  <Button variant="ghost" size="sm" asChild className="mb-6">
                    <Link href="/blog">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Blog&apos;a Don
                    </Link>
                  </Button>

                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Badge>{post.category}</Badge>
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h1 className="mb-6 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                    {post.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime} dk okuma</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Content */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl">
                  <Card>
                    <CardContent className="p-6 md:p-10">
                      <div className="mb-8 aspect-[16/9] overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-accent">
                        <div className="flex h-full items-center justify-center">
                          <BookOpen className="h-16 w-16 text-primary/30" />
                        </div>
                      </div>

                      <article className="prose prose-lg max-w-none">
                        <div
                          className="space-y-4 leading-relaxed text-foreground"
                          dangerouslySetInnerHTML={{ __html: htmlBody }}
                        />
                      </article>

                      <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          type="button"
                          onClick={() => void navigator.clipboard.writeText(window.location.href)}
                        >
                          <Share2 className="mr-2 h-4 w-4" />
                          Paylas
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {relatedPosts.length > 0 && (
              <section className="bg-muted/30 py-12">
                <div className="container mx-auto px-4">
                  <h2 className="mb-8 text-xl font-semibold">Ilgili Yazilar</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedPosts.map((relatedPost) => (
                      <BlogCard key={relatedPost.id} post={relatedPost} />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
