import Link from 'next/link';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Event } from '@/lib/types';

interface EventCardProps {
  event: Event;
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

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/20 to-accent">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-primary/30">{event.title.charAt(0)}</span>
        </div>
        {event.isFeatured && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            One Cikan
          </Badge>
        )}
      </div>
      
      <CardContent className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            {getLevelLabel(event.level)}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {event.language}
          </Badge>
        </div>
        
        <Link href={`/etkinlik/${event.slug}`}>
          <h3 className="mb-2 text-lg font-semibold leading-tight transition-colors group-hover:text-primary line-clamp-2">
            {event.title}
          </h3>
        </Link>
        
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {event.shortDescription}
        </p>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{formatDate(event.startDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.city}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span>{event.institution}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-border bg-muted/30 p-4">
        <div className="flex w-full items-center justify-between gap-3">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link href={`/etkinlik/${event.slug}`}>
              Detaylar
            </Link>
          </Button>
          <Button size="sm" asChild className="flex-1">
            <a href={event.link} target="_blank" rel="noopener noreferrer">
              Basvur
              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
