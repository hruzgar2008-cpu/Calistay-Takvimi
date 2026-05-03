import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/lib/types';

interface FeaturedEventsProps {
  events: Event[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long'
  });
}

export function FeaturedEvents({ events }: FeaturedEventsProps) {
  const featuredEvents = events.filter(e => e.isFeatured).slice(0, 3);

  if (featuredEvents.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary fill-primary" />
              <span className="text-sm font-medium text-primary">One Cikan Etkinlikler</span>
            </div>
            <h2 className="text-2xl font-bold md:text-3xl">Bu Ay Kacirmayin</h2>
          </div>
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="#etkinlikler">
              Tumu
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event, index) => (
            <Link
              key={event.id}
              href={`/etkinlik/${event.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Gradient Background */}
              <div className={`aspect-[4/3] ${
                index === 0 
                  ? 'bg-gradient-to-br from-primary via-primary/80 to-primary/60' 
                  : index === 1
                  ? 'bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500'
                  : 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'
              }`}>
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                  <div>
                    <Badge className="mb-3 bg-white/20 text-white hover:bg-white/30">
                      One Cikan
                    </Badge>
                    <h3 className="text-xl font-bold leading-tight line-clamp-2 group-hover:underline decoration-2 underline-offset-4">
                      {event.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-white/90">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(event.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/90">
                      <MapPin className="h-4 w-4" />
                      <span>{event.city}</span>
                    </div>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
              </div>

              <div className="p-5">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {event.shortDescription}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                  <span>Detaylari Gor</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="#etkinlikler">
              Tum Etkinlikler
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
