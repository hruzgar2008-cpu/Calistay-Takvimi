'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { sampleBlogPosts } from '@/lib/data';
import { useMergedBlogPosts } from '@/hooks/use-merged-blog-posts';

export default function AdminBlogPage() {
  const [search, setSearch] = useState('');
  const mergedPosts = useMergedBlogPosts(sampleBlogPosts);

  const filteredPosts = mergedPosts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog Yazilari</h1>
          <p className="text-muted-foreground">Tum blog yazilarini yonetin</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/yeni">
            <Plus className="mr-2 h-4 w-4" />
            Yeni Yazi
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Yazi ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredPosts.length} yazi
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Yazi Listesi</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Baslik</TableHead>
                <TableHead className="hidden sm:table-cell">Kategori</TableHead>
                <TableHead className="hidden md:table-cell">Yazar</TableHead>
                <TableHead className="hidden lg:table-cell">Tarih</TableHead>
                <TableHead className="hidden lg:table-cell">Durum</TableHead>
                <TableHead className="text-right">Islemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {post.isTrending && (
                        <TrendingUp className="h-4 w-4 text-primary" />
                      )}
                      <span className="font-medium">{post.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline">{post.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {post.author.name}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {new Date(post.publishedAt).toLocaleDateString('tr-TR')}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant="secondary">Yayinda</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Islemler</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/blog/${post.slug}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Goruntule
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/blog/yeni?duzenle=${post.slug}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Duzenle
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => alert(`"${post.title}" silme islemi demo modunda.`)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
