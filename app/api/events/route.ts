import { NextResponse } from 'next/server';
import { sampleEvents } from '@/lib/data';
import { mergeEvents } from '@/lib/event-storage';
import { eventToInsert, rowToEvent, type EventRow } from '@/lib/events-db-map';
import { createSupabaseAdmin, supabaseEnvConfigured } from '@/lib/supabase/server-admin';
import type { Event } from '@/lib/types';

export const dynamic = 'force-dynamic';

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET() {
  if (!supabaseEnvConfigured()) {
    return NextResponse.json({
      events: sampleEvents,
      warning: 'supabase_env_missing',
    });
  }

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: true });

    if (error) throw error;

    const rows = (data ?? []) as EventRow[];
    const dbEvents = rows.map(rowToEvent);
    return NextResponse.json({ events: mergeEvents(sampleEvents, dbEvents) });
  } catch (e) {
    console.error('[GET /api/events]', e);
    return NextResponse.json({
      events: sampleEvents,
      warning: 'database_error',
    });
  }
}

export async function POST(req: Request) {
  if (!supabaseEnvConfigured()) {
    return jsonError('Supabase ortam degiskenleri eksik veya anon key guncellenmemis.', 503);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError('Gecersiz JSON.', 400);
  }

  const b = body as Partial<Event>;
  const required = [
    'title',
    'slug',
    'description',
    'shortDescription',
    'startDate',
    'endDate',
    'city',
    'location',
    'level',
    'institution',
    'language',
    'link',
    'bannerImage',
    'organizer',
    'createdAt',
  ] as const;

  for (const key of required) {
    if (b[key] === undefined || b[key] === '') {
      return jsonError(`Eksik alan: ${key}`, 400);
    }
  }

  const org = b.organizer as Event['organizer'] | undefined;
  if (!org?.name?.trim()) {
    return jsonError('Organizator adi (organizer.name) gerekli.', 400);
  }

  const payload: Omit<Event, 'id'> = {
    title: String(b.title),
    slug: String(b.slug),
    description: String(b.description),
    shortDescription: String(b.shortDescription),
    startDate: String(b.startDate),
    endDate: String(b.endDate),
    city: String(b.city),
    location: String(b.location),
    level: b.level as Event['level'],
    institution: String(b.institution),
    language: b.language as Event['language'],
    link: String(b.link),
    bannerImage: String(b.bannerImage),
    organizer: org,
    isFeatured: Boolean(b.isFeatured),
    tags: Array.isArray(b.tags) ? b.tags : undefined,
    socialMedia: b.socialMedia,
    createdAt: String(b.createdAt),
  };

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from('events')
      .insert(eventToInsert(payload))
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return jsonError('Bu slug zaten kullaniliyor; basligi degistirip tekrar deneyin.', 409);
      }
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return jsonError(
          'Veritabaninda "events" tablosu yok. supabase/migrations/001_events.sql dosyasini Supabase SQL Editorde calistirin.',
          503,
        );
      }
      throw error;
    }

    const event = rowToEvent(data as EventRow);
    return NextResponse.json({ event });
  } catch (e) {
    console.error('[POST /api/events]', e);
    const msg = e instanceof Error ? e.message : 'Kayit basarisiz.';
    return jsonError(msg, 500);
  }
}

export async function DELETE(req: Request) {
  const id = new URL(req.url).searchParams.get('id');
  if (!id) return jsonError('id parametresi gerekli.', 400);

  if (!supabaseEnvConfigured()) {
    return jsonError('Supabase ortam degiskenleri eksik.', 503);
  }

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase.from('events').delete().eq('id', id).select('id');

    if (error) throw error;
    if (!data?.length) {
      return jsonError('Etkinlik bulunamadi veya silinemedi.', 404);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[DELETE /api/events]', e);
    return jsonError(e instanceof Error ? e.message : 'Silme basarisiz.', 500);
  }
}
