'use client';

import Link from 'next/link';
import { ExternalLink, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Event } from '@/lib/types';

interface EventTableProps {
  events: Event[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'short'
  });
}

function formatDateRange(startDate: string, endDate: string): string {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  if (start === end) return start;
  return `${start} - ${end}`;
}

function getLevelLabel(level: string): string {
  switch (level) {
    case 'lise':
      return 'Lise';
    case 'ortaokul':
      return 'Ortaokul';
    default:
      return 'Hepsi';
  }
}

function getLevelVariant(level: string): 'default' | 'secondary' | 'outline' {
  switch (level) {
    case 'lise':
      return 'default';
    case 'ortaokul':
      return 'secondary';
    default:
      return 'outline';
  }
}

export function EventTable({ events }: EventTableProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <span className="text-2xl">📅</span>
        </div>
        <h3 className="mb-2 text-lg font-semibold">Etkinlik Bulunamadi</h3>
        <p className="text-sm text-muted-foreground">Filtreleri degistirmeyi deneyin.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Etkinlik Adi</TableHead>
            <TableHead className="font-semibold">Tarih</TableHead>
            <TableHead className="font-semibold hidden sm:table-cell">Sehir</TableHead>
            <TableHead className="font-semibold hidden md:table-cell">Seviye</TableHead>
            <TableHead className="font-semibold hidden lg:table-cell">Kurum</TableHead>
            <TableHead className="font-semibold hidden lg:table-cell">Dil</TableHead>
            <TableHead className="text-right font-semibold">Islem</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow 
              key={event.id} 
              className="group transition-colors hover:bg-accent/50"
            >
              <TableCell className="font-medium">
                <Link 
                  href={`/etkinlik/${event.slug}`}
                  className="flex items-center gap-2 transition-colors hover:text-primary"
                >
                  {event.isFeatured && (
                    <span className="flex h-2 w-2 rounded-full bg-primary" title="One Cikan" />
                  )}
                  <span className="line-clamp-1">{event.title}</span>
                </Link>
              </TableCell>
              <TableCell className="text-muted-foreground whitespace-nowrap">
                {formatDateRange(event.startDate, event.endDate)}
              </TableCell>
              <TableCell className="text-muted-foreground hidden sm:table-cell">
                {event.city}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant={getLevelVariant(event.level)} className="text-xs">
                  {getLevelLabel(event.level)}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground hidden lg:table-cell">
                <span className="line-clamp-1">{event.institution}</span>
              </TableCell>
              <TableCell className="text-muted-foreground hidden lg:table-cell">
                {event.language}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    asChild
                    className="hidden sm:inline-flex"
                  >
                    <a href={event.link} target="_blank" rel="noopener noreferrer">
                      Basvur
                      <ExternalLink className="ml-1 h-3.5 w-3.5" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                    <Link href={`/etkinlik/${event.slug}`}>
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Detaylar</span>
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
