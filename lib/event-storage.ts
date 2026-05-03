import type { Event } from '@/lib/types';

export const CUSTOM_EVENTS_STORAGE_KEY = 'calistay-custom-events';
export const EVENTS_UPDATED_EVENT = 'calistay-events-updated';

export function parseCustomEvents(raw: string | null): Event[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Event[];
  } catch {
    return [];
  }
}

/** Özel etkinlikler önde; aynı slug varsa özelleştirilmiş sürüm geçerlidir. */
export function mergeEvents(sample: Event[], custom: Event[]): Event[] {
  const customSlugs = new Set(custom.map((e) => e.slug));
  const rest = sample.filter((e) => !customSlugs.has(e.slug));
  const sortedCustom = [...custom].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return [...sortedCustom, ...rest];
}

export function readCustomEvents(): Event[] {
  if (typeof window === 'undefined') return [];
  return parseCustomEvents(localStorage.getItem(CUSTOM_EVENTS_STORAGE_KEY));
}

export function writeCustomEvents(events: Event[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CUSTOM_EVENTS_STORAGE_KEY, JSON.stringify(events));
}

export function notifyEventsChanged(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(EVENTS_UPDATED_EVENT));
}

export function appendCustomEvent(event: Event): void {
  const existing = readCustomEvents();
  writeCustomEvents([event, ...existing]);
  notifyEventsChanged();
}

export function deleteCustomEventById(id: string): void {
  const existing = readCustomEvents();
  writeCustomEvents(existing.filter((e) => e.id !== id));
  notifyEventsChanged();
}
