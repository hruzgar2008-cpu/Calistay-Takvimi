import Link from 'next/link';
import { Mail, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">A</span>
              </div>
              <span className="text-xl font-bold tracking-tight">Atolye.co</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Lise ogrencileri icin atolye ve etkinlik kesfetme platformu.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="mailto:info@atolye.co"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Hizli Erisim</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Etkinlik Takvimi
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog Yazilari
              </Link>
              <Link href="/hakkimizda" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Hakkimizda
              </Link>
            </nav>
          </div>

          {/* For Organizers */}
          <div className="space-y-4">
            <h4 className="font-semibold">Organizatorler Icin</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/etkinlik-ekle" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Etkinlik Ekle
              </Link>
              <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Admin Paneli
              </Link>
              <Link href="/iletisim" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Iletisim
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Yasal</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/gizlilik" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Gizlilik Politikasi
              </Link>
              <Link href="/kullanim-kosullari" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Kullanim Kosullari
              </Link>
              <Link href="/cerez-politikasi" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cerez Politikasi
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Atolye.co. Tum haklari saklidir.
          </p>
          <p className="text-sm text-muted-foreground">
            Turkiye&apos;deki genc yetenekler icin yapildi.
          </p>
        </div>
      </div>
    </footer>
  );
}
