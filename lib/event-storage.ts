import type { Event } from '@/lib/types';

export const EVENTS_UPDATED_EVENT = 'calistay-events-updated';

/** Özel (DB) etkinlikler önde; aynı slug varsa veritabanı sürümü geçerlidir. */
export function mergeEvents(sample: Event[], custom: Event[]): Event[] {
  const customSlugs = new Set(custom.map((e) => e.slug));
  const rest = sample.filter((e) => !customSlugs.has(e.slug));
  const sortedCustom = [...custom].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return [...sortedCustom, ...rest];
}

export function notifyEventsChanged(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(EVENTS_UPDATED_EVENT));
}
