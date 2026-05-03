'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawFrom = searchParams.get('from') || '/admin';
  const from =
    rawFrom === '/admin' || rawFrom.startsWith('/admin/')
      ? rawFrom
      : '/admin';

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? 'Giris basarisiz.');
        setLoading(false);
        return;
      }
      router.replace(from);
      router.refresh();
    } catch {
      setError('Baglanti hatasi.');
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md border-border shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Lock className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl">Admin Girisi</CardTitle>
        <CardDescription>
          Oturum sifrelenmis cerez ve JWT ile korunur; sifre sunucuda bcrypt ile dogrulanir.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Yonetici sifresi</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              minLength={12}
              maxLength={512}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11"
            />
          </div>
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="w-full h-11" disabled={loading}>
            {loading ? 'Giris yapiliyor...' : 'Guvenli giris yap'}
          </Button>
          <Button variant="ghost" className="w-full" asChild type="button">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Ana siteye don
            </Link>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-muted/60 to-background px-4 py-12">
      <Suspense fallback={<div className="text-muted-foreground">Yukleniyor...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
