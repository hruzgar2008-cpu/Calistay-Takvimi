import { Calendar, FileText, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { sampleEvents, sampleBlogPosts } from '@/lib/data';

const stats = [
  {
    title: 'Toplam Etkinlik',
    value: sampleEvents.length.toString(),
    change: '+12%',
    trend: 'up',
    icon: Calendar,
  },
  {
    title: 'Blog Yazisi',
    value: sampleBlogPosts.length.toString(),
    change: '+5%',
    trend: 'up',
    icon: FileText,
  },
  {
    title: 'Kayitli Kullanici',
    value: '2,450',
    change: '+18%',
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Aylik Ziyaretci',
    value: '12,500',
    change: '-3%',
    trend: 'down',
    icon: TrendingUp,
  },
];

export default function AdminDashboard() {
  const recentEvents = sampleEvents.slice(0, 5);
  const recentPosts = sampleBlogPosts.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Dashboard</h1>
        <p className="text-muted-foreground">Hosgeldiniz! Iste platformunuzun genel gorunumu.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <Badge 
                  variant={stat.trend === 'up' ? 'default' : 'secondary'}
                  className="flex items-center gap-1"
                >
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.change}
                </Badge>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Son Etkinlikler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div 
                  key={event.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.city} • {new Date(event.startDate).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  {event.isFeatured && (
                    <Badge variant="secondary" className="ml-2 shrink-0">One Cikan</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Blog Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Son Blog Yazilari
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div 
                  key={post.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{post.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {post.author.name} • {new Date(post.publishedAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <Badge variant="outline" className="ml-2 shrink-0">{post.category}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hizli Islemler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a 
              href="/admin/etkinlikler/yeni"
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-accent"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Yeni Etkinlik</p>
                <p className="text-sm text-muted-foreground">Etkinlik olustur</p>
              </div>
            </a>
            <a 
              href="/admin/blog/yeni"
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-accent"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Yeni Yazi</p>
                <p className="text-sm text-muted-foreground">Blog yazisi ekle</p>
              </div>
            </a>
            <a 
              href="/admin/kullanicilar"
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-accent"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Kullanicilar</p>
                <p className="text-sm text-muted-foreground">Uyeleri yonet</p>
              </div>
            </a>
            <a 
              href="/"
              target="_blank"
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-accent"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Siteyi Gor</p>
                <p className="text-sm text-muted-foreground">Canli onizleme</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
