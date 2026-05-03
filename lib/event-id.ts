/** Supabase `events.id` uuid; ornek veride sayisal/kisa string id kullaniliyor. */
export function isDatabaseEventId(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}
