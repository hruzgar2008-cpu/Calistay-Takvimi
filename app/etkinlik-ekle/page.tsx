import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AddEventPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center">
        <PlusCircle className="mx-auto mb-4 h-10 w-10 text-primary" />
        <h1 className="mb-3 text-3xl font-bold">Etkinlik Ekle</h1>
        <p className="mb-8 text-muted-foreground">
          Yeni çalıştayını birkaç adımda platforma ekleyebilirsin.
        </p>
        <Button asChild size="lg">
          <Link href="/admin/etkinlikler/yeni">Etkinlik Formunu Aç</Link>
        </Button>
      </div>
    </main>
  );
}
