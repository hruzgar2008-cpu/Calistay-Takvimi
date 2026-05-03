'use client';

import { FeaturedEvents } from '@/components/featured-events';
import { EventsSection } from '@/components/events-section';
import { sampleEvents } from '@/lib/data';
import { useMergedEvents } from '@/hooks/use-merged-events';

export function HomeEvents() {
  const events = useMergedEvents(sampleEvents);
  return (
    <>
      <FeaturedEvents events={events} />
      <EventsSection events={events} />
    </>
  );
}
