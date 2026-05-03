import Link from 'next/link';
import { Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BlogPost } from '@/lib/types';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  if (variant === 'featured') {
    return (
      <Link href={`/blog/${post.slug}`} className="group">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/20 to-accent">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-primary/20">{post.title.charAt(0)}</span>
            </div>
            {post.isTrending && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                <TrendingUp className="mr-1 h-3 w-3" />
                Trend
              </Badge>
            )}
          </div>
          <CardContent className="p-6">
            <Badge variant="secondary" className="mb-3">
              {post.category}
            </Badge>
            <h3 className="mb-2 text-xl font-semibold leading-tight transition-colors group-hover:text-primary line-clamp-2">
              {post.title}
            </h3>
            <p className="mb-4 text-muted-foreground line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{formatDate(post.publishedAt)}</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} dk okuma</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
        <CardContent className="p-5">
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {post.category}
            </Badge>
            {post.isTrending && (
              <Badge variant="secondary" className="text-xs">
                <TrendingUp className="mr-1 h-3 w-3" />
                Trend
              </Badge>
            )}
          </div>
          <h3 className="mb-2 font-semibold leading-tight transition-colors group-hover:text-primary line-clamp-2">
            {post.title}
          </h3>
          <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readTime} dk</span>
            </div>
            <span className="flex items-center gap-1 font-medium text-primary transition-colors">
              Oku
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
