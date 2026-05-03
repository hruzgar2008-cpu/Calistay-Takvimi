'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    alert('Giris basarili! (Demo)');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/5 to-background px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <span className="text-lg font-bold text-primary-foreground">Ç</span>
            </div>
            <span className="text-2xl font-bold">Çalıştay Takvimi</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold">Hosgeldiniz</h1>
            <p className="text-muted-foreground">Hesabiniza giris yapin</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Sifre</Label>
                  <Link 
                    href="/sifremi-unuttum" 
                    className="text-sm text-primary hover:underline"
                  >
                    Sifremi unuttum
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="********" 
                    className="pl-10"
                    required 
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? 'Giris yapiliyor...' : (
                  <>
                    Giris Yap
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="justify-center border-t border-border pt-6">
            <p className="text-sm text-muted-foreground">
              Hesabiniz yok mu?{' '}
              <Link href="/kayit" className="font-medium text-primary hover:underline">
                Kayit olun
              </Link>
            </p>
          </CardFooter>
        </Card>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Giris yaparak{' '}
          <Link href="/kullanim-kosullari" className="text-primary hover:underline">
            Kullanim Kosullari
          </Link>
          {' '}ve{' '}
          <Link href="/gizlilik" className="text-primary hover:underline">
            Gizlilik Politikasi
          </Link>
          &apos;ni kabul etmis olursunuz.
        </p>
      </div>
    </div>
  );
}
