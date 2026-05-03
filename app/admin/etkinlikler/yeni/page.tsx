'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cities, levels } from '@/lib/data';

export default function NewEventPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [bannerFileName, setBannerFileName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    alert('Etkinlik basariyla olusturuldu! (Demo)');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/etkinlikler">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Yeni Etkinlik</h1>
          <p className="text-muted-foreground">Yeni bir etkinlik olusturun</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Temel Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Etkinlik Adi *</Label>
                  <Input id="title" placeholder="Ornek: Istanbul Girisimcilik Atolyesi" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shortDesc">Kisa Aciklama *</Label>
                  <Input id="shortDesc" placeholder="Bir cumlelik ozet" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Detayli Aciklama *</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Etkinlik hakkinda detayli bilgi..." 
                    rows={6}
                    required 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Date & Location */}
            <Card>
              <CardHeader>
                <CardTitle>Tarih ve Konum</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Baslangic Tarihi *</Label>
                    <Input id="startDate" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Bitis Tarihi *</Label>
                    <Input id="endDate" type="date" required />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">Sehir *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sehir secin" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.filter(c => c !== 'Tum Sehirler').map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Mekan Adi *</Label>
                    <Input id="location" placeholder="Ornek: Kolektif House, Levent" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle>Etkinlik Detaylari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="level">Seviye *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Seviye secin" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Dil *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Dil secin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Turkce">Turkce</SelectItem>
                        <SelectItem value="Ingilizce">Ingilizce</SelectItem>
                        <SelectItem value="Her Ikisi">Her Ikisi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution">Kurum / Organizator *</Label>
                  <Input id="institution" placeholder="Ornek: Girisimcilik Vakfi" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link">Basvuru Linki *</Label>
                  <Input id="link" type="url" placeholder="https://..." required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Etiketler</Label>
                  <Input id="tags" placeholder="girisimcilik, startup, is-fikri (virgul ile ayirin)" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Banner Image */}
            <Card>
              <CardHeader>
                <CardTitle>Banner Gorseli</CardTitle>
              </CardHeader>
              <CardContent>
                <label
                  htmlFor="banner"
                  className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 transition-colors hover:border-primary hover:bg-muted/50"
                >
                  <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {bannerFileName || 'Gorsel yukle'}
                  </p>
                </label>
                <Input
                  id="banner"
                  type="file"
                  accept="image/*"
                  className="mt-3"
                  onChange={(e) => setBannerFileName(e.target.files?.[0]?.name || '')}
                />
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Ayarlar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">One Cikan</p>
                    <p className="text-sm text-muted-foreground">Ana sayfada goster</p>
                  </div>
                  <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Sosyal Medya</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" placeholder="@kullanici_adi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input id="twitter" placeholder="@kullanici_adi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Web Sitesi</Label>
                  <Input id="website" type="url" placeholder="https://..." />
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                'Kaydediliyor...'
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Etkinligi Kaydet
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
