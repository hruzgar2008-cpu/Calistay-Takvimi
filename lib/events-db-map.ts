import type { Event } from '@/lib/types';

export type EventRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  start_date: string;
  end_date: string;
  city: string;
  location: string;
  level: string;
  institution: string;
  language: string;
  link: string;
  banner_image: string;
  organizer: Event['organizer'];
  is_featured: boolean | null;
  tags: string[] | null;
  social_media: Event['socialMedia'] | null;
  created_at: string;
};

export function rowToEvent(row: EventRow): Event {
  const d = (v: string) => v.slice(0, 10);
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    shortDescription: row.short_description,
    startDate: d(row.start_date),
    endDate: d(row.end_date),
    city: row.city,
    location: row.location,
    level: row.level as Event['level'],
    institution: row.institution,
    language: row.language as Event['language'],
    link: row.link,
    bannerImage: row.banner_image || '/images/events/coding.jpg',
    organizer: row.organizer,
    isFeatured: row.is_featured ?? false,
    tags: row.tags?.length ? row.tags : undefined,
    socialMedia: row.social_media ?? undefined,
    createdAt: d(row.created_at),
  };
}

export function eventToInsert(event: Omit<Event, 'id'>): Record<string, unknown> {
  return {
    title: event.title,
    slug: event.slug,
    description: event.description,
    short_description: event.shortDescription,
    start_date: event.startDate,
    end_date: event.endDate,
    city: event.city,
    location: event.location,
    level: event.level,
    institution: event.institution,
    language: event.language,
    link: event.link,
    banner_image: event.bannerImage,
    organizer: event.organizer,
    is_featured: event.isFeatured ?? false,
    tags: event.tags ?? null,
    social_media: event.socialMedia ?? null,
    created_at: event.createdAt,
  };
}
