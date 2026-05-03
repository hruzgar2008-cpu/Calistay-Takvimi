'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import type { BlogPost } from '@/lib/types';
import {
  appendCustomBlogPost,
  estimateReadTimeMinutes,
  slugifyTurkish,
} from '@/lib/blog-storage';

export default function NewBlogPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [contentBody, setContentBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const baseSlug = slugifyTurkish(title) || 'yazi';
    const slug = `${baseSlug}-${Date.now().toString(36)}`;
    const content = `# ${title}\n\n${contentBody}`.trim();
    const publishedAt = new Date().toISOString().slice(0, 10);

    const newPost: BlogPost = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      slug,
      excerpt: excerpt.trim(),
      content,
      coverImage: '',
      author: {
        name: 'Admin',
      },
      publishedAt,
      category: category.trim(),
      tags: [],
      readTime: estimateReadTimeMinutes(contentBody),
      isTrending: false,
    };

    appendCustomBlogPost(newPost);
    await new Promise((resolve) => setTimeout(resolve, 200));

    setIsSubmitting(false);
    router.push('/admin/blog');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/blog">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Yeni Yazi</h1>
          <p className="text-muted-foreground">Blog icerigi olusturun</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Icerik</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Baslik *</Label>
              <Input
                id="title"
                required
                placeholder="Yazi basligi"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Kategori *</Label>
              <Input
                id="category"
                required
                placeholder="Orn: Rehber"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Ozet *</Label>
              <Textarea
                id="excerpt"
                rows={3}
                required
                placeholder="Kisa ozet"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Icerik *</Label>
              <Textarea
                id="content"
                rows={10}
                required
                placeholder="Yazi icerigi (paragraflari ayirmak icin bos satir birakin)"
                value={contentBody}
                onChange={(e) => setContentBody(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Kaydediliyor...' : 'Yaziyi Kaydet'}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
