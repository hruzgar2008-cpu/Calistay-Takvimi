'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, Star } from 'lucide-react';
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
import { sampleEvents } from '@/lib/data';
import { useMergedEvents } from '@/hooks/use-merged-events';
import { notifyEventsChanged } from '@/lib/event-storage';
import { isDatabaseEventId } from '@/lib/event-id';

export default function AdminEventsPage() {
  const [search, setSearch] = useState('');
  const allEvents = useMergedEvents(sampleEvents);

  const filteredEvents = allEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.city.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Etkinlikler</h1>
          <p className="text-muted-foreground">Tum etkinlikleri yonetin</p>
        </div>
        <Button asChild>
          <Link href="/admin/etkinlikler/yeni">
            <Plus className="mr-2 h-4 w-4" />
            Yeni Etkinlik
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Etkinlik ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-sm text-muted-foreground">{filteredEvents.length} etkinlik</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Etkinlik Listesi</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Etkinlik</TableHead>
                <TableHead className="hidden sm:table-cell">Sehir</TableHead>
                <TableHead className="hidden md:table-cell">Tarih</TableHead>
                <TableHead className="hidden lg:table-cell">Kurum</TableHead>
                <TableHead className="hidden lg:table-cell">Kaynak</TableHead>
                <TableHead className="text-right">Islemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => {
                const fromDb = isDatabaseEventId(event.id);
                return (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {event.isFeatured && (
                          <Star className="h-4 w-4 fill-primary text-primary" />
                        )}
                        <span className="font-medium">{event.title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{event.city}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(event.startDate).toLocaleDateString('tr-TR')}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{event.institution}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant={fromDb ? 'default' : 'secondary'}>
                        {fromDb ? 'Veritabani' : 'Ornek'}
                      </Badge>
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
                            <Link href={`/etkinlik/${event.slug}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              Goruntule
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/etkinlikler/yeni?duzenle=${event.slug}`}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Duzenle
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={async () => {
                              if (!fromDb) {
                                alert(
                                  'Ornek etkinlikler koddaki sabit veridir. Silmek icin Supabase kayitlarini kullanin.',
                                );
                                return;
                              }
                              const res = await fetch(
                                `/api/events?id=${encodeURIComponent(event.id)}`,
                                { method: 'DELETE' },
                              );
                              const data = (await res.json()) as { error?: string };
                              if (!res.ok) {
                                alert(data.error ?? 'Silinemedi.');
                                return;
                              }
                              notifyEventsChanged();
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Sil
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
