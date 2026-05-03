'use client';

import { useEffect, useState } from 'react';
import type { Event } from '@/lib/types';
import {
  EVENTS_UPDATED_EVENT,
  mergeEvents,
  readCustomEvents,
} from '@/lib/event-storage';

export function useMergedEvents(sample: Event[]): Event[] {
  const [events, setEvents] = useState<Event[]>(sample);

  useEffect(() => {
    function load() {
      const custom = readCustomEvents();
      setEvents(mergeEvents(sample, custom));
    }
    load();
    window.addEventListener('storage', load);
    window.addEventListener(EVENTS_UPDATED_EVENT, load);
    return () => {
      window.removeEventListener('storage', load);
      window.removeEventListener(EVENTS_UPDATED_EVENT, load);
    };
  }, [sample]);

  return events;
}
