'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { slugifyTurkish } from '@/lib/blog-storage';
import { appendCustomEvent } from '@/lib/event-storage';
import type { Event } from '@/lib/types';

const DEFAULT_BANNER = '/images/events/coding.jpg';

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : DEFAULT_BANNER);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function NewEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [bannerFileName, setBannerFileName] = useState('');
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [level, setLevel] = useState<Event['level']>('lise');
  const [language, setLanguage] = useState<Event['language']>('Turkce');
  const [institution, setInstitution] = useState('');
  const [link, setLink] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city) {
      alert('Lutfen sehir secin.');
      return;
    }

    setIsSubmitting(true);

    let bannerImage = DEFAULT_BANNER;
    if (bannerFile) {
      try {
        bannerImage = await readFileAsDataUrl(bannerFile);
      } catch {
        bannerImage = DEFAULT_BANNER;
      }
    }

    const baseSlug = slugifyTurkish(title.trim()) || 'etkinlik';
    const slug = `${baseSlug}-${Date.now().toString(36)}`;
    const createdAt = new Date().toISOString().slice(0, 10);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const social: NonNullable<Event['socialMedia']> = {};
    if (instagram.trim()) social.instagram = instagram.trim();
    if (twitter.trim()) social.twitter = twitter.trim();
    if (website.trim()) social.website = website.trim();

    const newEvent: Event = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      slug,
      description: description.trim(),
      shortDescription: shortDescription.trim(),
      startDate,
      endDate,
      city,
      location: location.trim(),
      level,
      institution: institution.trim(),
      language,
      link: link.trim(),
      bannerImage,
      organizer: {
        name: institution.trim(),
      },
      isFeatured,
      tags: tags.length ? tags : undefined,
      socialMedia: Object.keys(social).length ? social : undefined,
      createdAt,
    };

    appendCustomEvent(newEvent);
    await new Promise((resolve) => setTimeout(resolve, 200));
    setIsSubmitting(false);
    router.push('/admin/etkinlikler');
  };

  return (
    <div className="space-y-6">
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
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Temel Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Etkinlik Adi *</Label>
                  <Input
                    id="title"
                    placeholder="Ornek: Istanbul Girisimcilik Atolyesi"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shortDesc">Kisa Aciklama *</Label>
                  <Input
                    id="shortDesc"
                    placeholder="Bir cumlelik ozet"
                    required
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Detayli Aciklama *</Label>
                  <Textarea
                    id="description"
                    placeholder="Etkinlik hakkinda detayli bilgi..."
                    rows={6}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tarih ve Konum</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Baslangic Tarihi *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Bitis Tarihi *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      required
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Sehir *</Label>
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sehir secin" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities
                          .filter((c) => c !== 'Tum Sehirler')
                          .map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Mekan Adi *</Label>
                    <Input
                      id="location"
                      placeholder="Ornek: Kolektif House, Levent"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Etkinlik Detaylari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Seviye *</Label>
                    <Select value={level} onValueChange={(v) => setLevel(v as Event['level'])}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seviye secin" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((lv) => (
                          <SelectItem key={lv.value} value={lv.value}>
                            {lv.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Dil *</Label>
                    <Select
                      value={language}
                      onValueChange={(v) => setLanguage(v as Event['language'])}
                    >
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
                  <Input
                    id="institution"
                    placeholder="Ornek: Girisimcilik Vakfi"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link">Basvuru Linki *</Label>
                  <Input
                    id="link"
                    type="url"
                    placeholder="https://..."
                    required
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Etiketler</Label>
                  <Input
                    id="tags"
                    placeholder="girisimcilik, startup, is-fikri (virgul ile ayirin)"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
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
                    {bannerFileName || 'Gorsel yukle (istege bagli)'}
                  </p>
                </label>
                <Input
                  id="banner"
                  type="file"
                  accept="image/*"
                  className="mt-3"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    setBannerFile(f);
                    setBannerFileName(f?.name || '');
                  }}
                />
              </CardContent>
            </Card>

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

            <Card>
              <CardHeader>
                <CardTitle>Sosyal Medya</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    placeholder="@kullanici_adi"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    placeholder="@kullanici_adi"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Web Sitesi</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://..."
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

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
