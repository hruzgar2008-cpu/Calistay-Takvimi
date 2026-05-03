'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Calendar, BookOpen, User } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">A</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Atolye.co</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link 
            href="/" 
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Calendar className="h-4 w-4" />
            Etkinlikler
          </Link>
          <Link 
            href="/blog" 
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <BookOpen className="h-4 w-4" />
            Blog
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/giris">Giris Yap</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/kayit">Kayit Ol</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background p-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link 
              href="/" 
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar className="h-4 w-4" />
              Etkinlikler
            </Link>
            <Link 
              href="/blog" 
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen className="h-4 w-4" />
              Blog
            </Link>
            <hr className="my-2 border-border" />
            <Link 
              href="/giris" 
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-4 w-4" />
              Giris Yap
            </Link>
            <Button size="sm" className="mt-1" asChild>
              <Link href="/kayit">Kayit Ol</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
