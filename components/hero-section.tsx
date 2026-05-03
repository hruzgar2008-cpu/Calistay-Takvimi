import { ArrowRight, Plus, Sparkles, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-16 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-1/3 -left-24 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="absolute bottom-0 -right-24 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" />
            <span>Yeni nesil çalıştay platformu</span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-balance md:text-5xl lg:text-6xl">
            Türkiye&apos;deki Tüm Çalıştayları{' '}
            <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Tek Yerde Keşfet
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Etkinlik bul, başvur, kendi çalıştayını duyur.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="min-w-[190px] bg-gradient-to-r from-primary to-violet-500 shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02]"
            >
              <Link href="#etkinlikler">
                Etkinlikleri Gör
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="min-w-[190px] border-primary/30 bg-background/70 backdrop-blur transition-transform hover:scale-[1.02] hover:bg-primary/5"
            >
              <Link href="/etkinlik-ekle">
                Etkinlik Ekle
                <Plus className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-2xl border border-primary/10 bg-background/70 p-5 shadow-sm backdrop-blur">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-bold md:text-3xl">50+</span>
              <span className="text-sm text-muted-foreground">Aktif Etkinlik</span>
            </div>
            <div className="flex flex-col items-center rounded-2xl border border-primary/10 bg-background/70 p-5 shadow-sm backdrop-blur">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-bold md:text-3xl">5,000+</span>
              <span className="text-sm text-muted-foreground">Öğrenci</span>
            </div>
            <div className="col-span-2 flex flex-col items-center rounded-2xl border border-primary/10 bg-background/70 p-5 shadow-sm backdrop-blur md:col-span-1">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-bold md:text-3xl">20+</span>
              <span className="text-sm text-muted-foreground">Şehir</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
