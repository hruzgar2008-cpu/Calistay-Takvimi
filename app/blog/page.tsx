'use client';

import { useMemo, useState } from 'react';
import { BookOpen, TrendingUp } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BlogCard } from '@/components/blog-card';
import { Badge } from '@/components/ui/badge';
import { sampleBlogPosts } from '@/lib/data';
import { useMergedBlogPosts } from '@/hooks/use-merged-blog-posts';

const categories = ['Tumu', 'Rehber', 'Kariyer', 'Egitim', 'Kisisel Gelisim'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tumu');
  const allPosts = useMergedBlogPosts(sampleBlogPosts);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'Tumu') return allPosts;
    return allPosts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory, allPosts]);

  const trendingPosts = filteredPosts.filter((p) => p.isTrending);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-4 inline-flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Blog</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl text-balance">
              Rehberler ve Ipuclari
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
              Atolyelere hazirlanmak, network kurmak ve kariyer planlamak icin 
              uzmanlardan ipuclari ve rehberler.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
              {categories.map((category) => (
                <Badge 
                  key={category} 
                  variant={category === selectedCategory ? 'default' : 'secondary'}
                  className="cursor-pointer whitespace-nowrap px-4 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedCategory(category)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedCategory(category);
                    }
                  }}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Section */}
        {trendingPosts.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Trend Yazilar</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {trendingPosts.map((post) => (
                  <BlogCard key={post.id} post={post} variant="featured" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-xl font-semibold">
              {selectedCategory === 'Tumu' ? 'Tum Yazilar' : `${selectedCategory} Yazilari`}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
