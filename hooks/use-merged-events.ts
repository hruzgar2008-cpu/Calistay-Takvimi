'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Event } from '@/lib/types';
import { EVENTS_UPDATED_EVENT } from '@/lib/event-storage';

async function fetchMergedEvents(sample: Event[]): Promise<Event[]> {
  try {
    const res = await fetch('/api/events', { cache: 'no-store' });
    const data = (await res.json()) as { events?: Event[] };
    if (Array.isArray(data.events)) return data.events;
  } catch {
    /* ignore */
  }
  return sample;
}

export function useMergedEvents(sample: Event[]): Event[] {
  const [events, setEvents] = useState<Event[]>(sample);

  const load = useCallback(() => {
    void fetchMergedEvents(sample).then(setEvents);
  }, [sample]);

  useEffect(() => {
    load();
    window.addEventListener('storage', load);
    window.addEventListener(EVENTS_UPDATED_EVENT, load);
    return () => {
      window.removeEventListener('storage', load);
      window.removeEventListener(EVENTS_UPDATED_EVENT, load);
    };
  }, [load]);

  return events;
}
