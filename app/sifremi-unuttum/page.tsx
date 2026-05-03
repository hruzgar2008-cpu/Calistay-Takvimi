'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/5 to-background px-4 py-12">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Sifre Sifirlama</h1>
            <p className="text-sm text-muted-foreground">E-posta adresini gir, sifirlama baglantisi gonderelim.</p>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <p className="rounded-md bg-primary/10 p-3 text-sm text-primary">
                Eger bu e-posta ile bir hesap varsa sifirlama adimlarini gonderdik.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">Gonder</Button>
              </form>
            )}
            <Button variant="ghost" className="mt-4 w-full" asChild>
              <Link href="/giris">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Giris sayfasina don
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
