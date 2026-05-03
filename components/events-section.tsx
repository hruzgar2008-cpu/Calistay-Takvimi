'use client';

import { useState, useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { EventFilters } from './event-filters';
import { EventCard } from './event-card';
import { EventTable } from './event-table';
import { Event } from '@/lib/types';

interface EventsSectionProps {
  events: Event[];
}

export function EventsSection({ events }: EventsSectionProps) {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('Tum Sehirler');
  const [level, setLevel] = useState('hepsi');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesSearch =
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.institution.toLowerCase().includes(searchLower) ||
          event.city.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // City filter
      if (city !== 'Tum Sehirler' && event.city !== city) {
        return false;
      }

      // Level filter
      if (level !== 'hepsi' && event.level !== level && event.level !== 'hepsi') {
        return false;
      }

      return true;
    });
  }, [events, search, city, level]);

  const handleClearFilters = () => {
    setSearch('');
    setCity('Tum Sehirler');
    setLevel('hepsi');
  };

  return (
    <section id="etkinlikler" className="py-16 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Etkinlik Takvimi</span>
          </div>
          <h2 className="text-2xl font-bold md:text-3xl">Yaklasan Etkinlikler</h2>
          <p className="mt-2 text-muted-foreground">
            {filteredEvents.length} etkinlik bulundu
          </p>
        </div>

        <EventFilters
          search={search}
          onSearchChange={setSearch}
          city={city}
          onCityChange={setCity}
          level={level}
          onLevelChange={setLevel}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onClearFilters={handleClearFilters}
        />

        <div className="mt-8">
          {viewMode === 'grid' ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <EventTable events={filteredEvents} />
          )}
        </div>
      </div>
    </section>
  );
}
