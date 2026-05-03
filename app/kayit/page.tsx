'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const benefits = [
  'Etkinlikleri favorilere ekle',
  'Yeni etkinlik bildirimleri al',
  'Kisisel takvim olustur',
];

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert('Lutfen kullanim kosullarini kabul edin.');
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    alert('Kayit basarili! (Demo)');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/5 to-background px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <span className="text-lg font-bold text-primary-foreground">A</span>
            </div>
            <span className="text-2xl font-bold">Atolye.co</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold">Hesap Olustur</h1>
            <p className="text-muted-foreground">Ucretsiz kayit ol, etkinlikleri kesfet</p>
          </CardHeader>
          
          <CardContent>
            {/* Benefits */}
            <div className="mb-6 rounded-lg bg-primary/5 p-4">
              <p className="mb-3 text-sm font-medium">Uyelik avantajlari:</p>
              <ul className="space-y-2">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ad Soyad</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Adiniz Soyadiniz" 
                    className="pl-10"
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="ornek@email.com" 
                    className="pl-10"
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Sifre</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="En az 8 karakter" 
                    className="pl-10"
                    minLength={8}
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Sifre Tekrar</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="Sifrenizi tekrar girin" 
                    className="pl-10"
                    minLength={8}
                    required 
                  />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  <Link href="/kullanim-kosullari" className="text-primary hover:underline">
                    Kullanim Kosullari
                  </Link>
                  {' '}ve{' '}
                  <Link href="/gizlilik" className="text-primary hover:underline">
                    Gizlilik Politikasi
                  </Link>
                  &apos;ni okudum ve kabul ediyorum.
                </Label>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? 'Kayit yapiliyor...' : (
                  <>
                    Kayit Ol
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="justify-center border-t border-border pt-6">
            <p className="text-sm text-muted-foreground">
              Zaten hesabiniz var mi?{' '}
              <Link href="/giris" className="font-medium text-primary hover:underline">
                Giris yapin
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
