import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Globe, 
  ExternalLink,
  Share2,
  Heart,
  Instagram,
  Twitter
} from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { sampleEvents } from '@/lib/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function getLevelLabel(level: string): string {
  switch (level) {
    case 'lise':
      return 'Lise';
    case 'ortaokul':
      return 'Ortaokul';
    default:
      return 'Tum Seviyeler';
  }
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = sampleEvents.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Banner */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-primary/60 md:h-80 lg:h-96">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[200px] font-bold text-white/10">{event.title.charAt(0)}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Back button */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6">
            <Button variant="secondary" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Geri
              </Link>
            </Button>
          </div>
          
          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2 md:top-6 md:right-6">
            <Button variant="secondary" size="icon">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Favorilere Ekle</span>
            </Button>
            <Button variant="secondary" size="icon">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Paylas</span>
            </Button>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="container mx-auto">
              <div className="flex flex-wrap gap-2 mb-3">
                {event.isFeatured && (
                  <Badge className="bg-white text-primary">One Cikan</Badge>
                )}
                <Badge variant="secondary">{getLevelLabel(event.level)}</Badge>
                <Badge variant="outline" className="border-white/50 text-white">
                  {event.language}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold text-white md:text-4xl lg:text-5xl text-balance">
                {event.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">Etkinlik Hakkinda</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {event.description}
                  </p>
                </CardContent>
              </Card>

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="mb-4 text-xl font-semibold">Etiketler</h2>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Organizer */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">Organizator</h2>
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Users className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{event.organizer.name}</h3>
                      {event.organizer.description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {event.organizer.description}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <Card className="sticky top-24 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tarih</p>
                        <p className="font-medium">
                          {formatDate(event.startDate)}
                          {event.startDate !== event.endDate && (
                            <> - {formatDate(event.endDate)}</>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Konum</p>
                        <p className="font-medium">{event.location}</p>
                        <p className="text-sm text-muted-foreground">{event.city}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Dil</p>
                        <p className="font-medium">{event.language}</p>
                      </div>
                    </div>
                  </div>

                  <Button size="lg" className="w-full" asChild>
                    <a href={event.link} target="_blank" rel="noopener noreferrer">
                      Hemen Basvur
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>

                  {/* Social Media */}
                  {event.socialMedia && (
                    <div className="pt-4 border-t border-border">
                      <p className="mb-3 text-sm text-muted-foreground">Sosyal Medya</p>
                      <div className="flex gap-2">
                        {event.socialMedia.instagram && (
                          <Button variant="outline" size="icon" asChild>
                            <a 
                              href={`https://instagram.com/${event.socialMedia.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Instagram className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {event.socialMedia.twitter && (
                          <Button variant="outline" size="icon" asChild>
                            <a 
                              href={`https://twitter.com/${event.socialMedia.twitter.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Twitter className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {event.socialMedia.website && (
                          <Button variant="outline" size="icon" asChild>
                            <a 
                              href={event.socialMedia.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Globe className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return sampleEvents.map((event) => ({
    slug: event.slug,
  }));
}
