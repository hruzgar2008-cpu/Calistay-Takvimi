'use client';

import { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 text-center text-primary-foreground md:p-12">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <Mail className="h-6 w-6" />
          </div>
          
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">
            Yeni Etkinliklerden Haberdar Ol
          </h2>
          
          <p className="mb-8 text-primary-foreground/90">
            Haftada bir, ilgi alanlariniza uygun yeni atolye ve etkinlikleri e-postaniza gonderelim.
          </p>

          {isSubmitted ? (
            <div className="flex items-center justify-center gap-2 rounded-lg bg-white/20 px-6 py-4">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Basariyla kayit oldunuz!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Input
                type="email"
                placeholder="E-posta adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:border-white focus:ring-white sm:w-72"
                required
              />
              <Button 
                type="submit" 
                size="lg"
                disabled={isLoading}
                className="h-12 bg-white text-primary hover:bg-white/90"
              >
                {isLoading ? (
                  'Gonderiliyor...'
                ) : (
                  <>
                    Abone Ol
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}
          
          <p className="mt-4 text-sm text-primary-foreground/70">
            Istediginiz zaman abonelikten cikabilirsiniz.
          </p>
        </div>
      </div>
    </section>
  );
}
