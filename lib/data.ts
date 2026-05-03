import { Event, BlogPost } from './types';

export const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Istanbul Girisimcilik Atolyesi',
    slug: 'istanbul-girisimcilik-atolyesi',
    description: 'Girisimcilik dunyasina adim atmak isteyen lise ogrencileri icin kapsamli bir atolye. Is fikri gelistirme, pitch yapma ve yatirimci bulma konularinda uzman konusmacilardan ogrenin.',
    shortDescription: 'Girisimcilik dunyasina ilk adiminizi atin',
    startDate: '2026-06-15',
    endDate: '2026-06-17',
    city: 'Istanbul',
    location: 'Kolektif House, Levent',
    level: 'lise',
    institution: 'Girisimcilik Vakfi',
    language: 'Turkce',
    link: 'https://example.com/apply',
    socialMedia: {
      instagram: '@girisimcilik_vakfi',
      website: 'https://girisimcilik.org'
    },
    bannerImage: '/images/events/entrepreneurship.jpg',
    organizer: {
      name: 'Girisimcilik Vakfi',
      description: 'Genc girisimcileri destekleyen sivil toplum kurulusu'
    },
    isFeatured: true,
    tags: ['girisimcilik', 'startup', 'is-fikri'],
    createdAt: '2026-01-15'
  },
  {
    id: '2',
    title: 'Ankara Kodlama Kampi',
    slug: 'ankara-kodlama-kampi',
    description: 'Sifirdan programlama ogrenmek isteyen ogrenciler icin yogun bir hafta sonu kampi. Python, web gelistirme ve yapay zeka temelleri islenecek.',
    shortDescription: 'Kodlama dunyasina giris yapin',
    startDate: '2026-07-01',
    endDate: '2026-07-03',
    city: 'Ankara',
    location: 'ODTU Teknokent',
    level: 'lise',
    institution: 'Kod Akademi',
    language: 'Turkce',
    link: 'https://example.com/kodlama',
    socialMedia: {
      instagram: '@kodakademi'
    },
    bannerImage: '/images/events/coding.jpg',
    organizer: {
      name: 'Kod Akademi',
      description: 'Teknoloji egitimi veren online platform'
    },
    isFeatured: true,
    tags: ['kodlama', 'python', 'yapay-zeka'],
    createdAt: '2026-02-01'
  },
  {
    id: '3',
    title: 'Izmir Liderlik Zirvesi',
    slug: 'izmir-liderlik-zirvesi',
    description: 'Genc liderlerin bir araya geldigi, liderlik becerilerini gelistirdigi ve network kurabilecegi bir etkinlik.',
    shortDescription: 'Liderlik potansiyelinizi kesfendin',
    startDate: '2026-08-10',
    endDate: '2026-08-12',
    city: 'Izmir',
    location: 'Ege Universitesi Konferans Salonu',
    level: 'hepsi',
    institution: 'Genc Liderler Dernegi',
    language: 'Turkce',
    link: 'https://example.com/liderlik',
    bannerImage: '/images/events/leadership.jpg',
    organizer: {
      name: 'Genc Liderler Dernegi'
    },
    tags: ['liderlik', 'network', 'kisisel-gelisim'],
    createdAt: '2026-02-15'
  },
  {
    id: '4',
    title: 'Bursa Tasarim Atolyesi',
    slug: 'bursa-tasarim-atolyesi',
    description: 'Grafik tasarim, UI/UX ve dijital sanat konularinda uygulamali egitim. Adobe Creative Suite ve Figma ogrenin.',
    shortDescription: 'Yaraticiliginizigorsel tasarima donusturun',
    startDate: '2026-09-05',
    endDate: '2026-09-07',
    city: 'Bursa',
    location: 'Kultur Merkezi',
    level: 'lise',
    institution: 'Dijital Sanatlar Akademisi',
    language: 'Turkce',
    link: 'https://example.com/tasarim',
    bannerImage: '/images/events/design.jpg',
    organizer: {
      name: 'Dijital Sanatlar Akademisi'
    },
    tags: ['tasarim', 'ui-ux', 'grafik'],
    createdAt: '2026-03-01'
  },
  {
    id: '5',
    title: 'Antalya Cevre Konferansi',
    slug: 'antalya-cevre-konferansi',
    description: 'Iklim degisikligi, surdurulebilirlik ve cevre koruma konularinda bilinclendirme etkinligi. Alaninda uzman akademisyenler ve aktivistler katilacak.',
    shortDescription: 'Gezegenimiz icin harekete gecin',
    startDate: '2026-10-20',
    endDate: '2026-10-22',
    city: 'Antalya',
    location: 'Akdeniz Universitesi',
    level: 'hepsi',
    institution: 'Yesil Gelecek Platformu',
    language: 'Her Ikisi',
    link: 'https://example.com/cevre',
    bannerImage: '/images/events/environment.jpg',
    organizer: {
      name: 'Yesil Gelecek Platformu'
    },
    isFeatured: true,
    tags: ['cevre', 'surdurulebilirlik', 'iklim'],
    createdAt: '2026-03-15'
  },
  {
    id: '6',
    title: 'Online Yazarlık Atolyesi',
    slug: 'online-yazarlik-atolyesi',
    description: 'Yaratici yazarlik, hikaye anlatimi ve icerik uretimi konularinda online egitim programi.',
    shortDescription: 'Hikayenizi dunya ile paylasin',
    startDate: '2026-11-01',
    endDate: '2026-11-15',
    city: 'Online',
    location: 'Zoom',
    level: 'ortaokul',
    institution: 'Kelime Atolyesi',
    language: 'Turkce',
    link: 'https://example.com/yazarlik',
    bannerImage: '/images/events/writing.jpg',
    organizer: {
      name: 'Kelime Atolyesi'
    },
    tags: ['yazarlik', 'yaratici', 'icerik'],
    createdAt: '2026-04-01'
  }
];

export const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Ilk Atolyenize Nasil Hazirlanirsiniz?',
    slug: 'ilk-atolyenize-nasil-hazirlanirsiniz',
    excerpt: 'Bir atolyeye ilk kez katilacaksiniz ve heyecanli misiniz? Iste size yardimci olacak ipuclari.',
    content: `
# Ilk Atolyenize Nasil Hazirlanirsiniz?

Bir atolyeye ilk kez katilmak heyecan verici olabilir. Iste baslangic icin bazi ipuclari:

## 1. Arastirma Yapin
Etkinlik hakkinda mumkun oldugu kadar bilgi edinin. Organizatorleri, konusmacilari ve programi inceleyin.

## 2. Sorularinizi Hazirlayin
Konusmacilara ve diger katilimcilara sormak istediginiz sorulari onceden dusunun.

## 3. Not Defterinizi Unutmayin
Onemli bilgileri not almak icin mutlaka bir defter veya tablet bulundurun.

## 4. Network Yapin
Yeni insanlarla tanismaktan cekinmeyin. Bu etkinlikler harika firsatlar sunar.
    `,
    coverImage: '/images/blog/first-workshop.jpg',
    author: {
      name: 'Elif Yilmaz'
    },
    publishedAt: '2026-04-10',
    category: 'Rehber',
    tags: ['baslangic', 'ipuclari', 'atolye'],
    readTime: 5,
    isTrending: true
  },
  {
    id: '2',
    title: 'Atolyelerde Network Kurmanin Onemi',
    slug: 'atolyelerde-network-kurmanin-onemi',
    excerpt: 'Etkinliklerde kurdunuz baglantilaryarilasini nasil sekillendirebilir?',
    content: `
# Atolyelerde Network Kurmanin Onemi

Network kurmak sadece kartvizit degistirmek degildir. Gercek iliskiler kurmak hakkindadir.

## Neden Onemli?
- Kariyer firsatlari
- Mentorlik iliskileri
- Isbirligi projeleri
- Farkli bakis acilari

## Nasil Yapmali?
Samimi olun, dinleyin ve takip edin.
    `,
    coverImage: '/images/blog/networking.jpg',
    author: {
      name: 'Ahmet Kaya'
    },
    publishedAt: '2026-04-05',
    category: 'Kariyer',
    tags: ['network', 'kariyer', 'iliskiler'],
    readTime: 4,
    isTrending: true
  },
  {
    id: '3',
    title: 'Online Atolyelerin Avantajlari',
    slug: 'online-atolyelerin-avantajlari',
    excerpt: 'Fiziksel etkinliklere katilmadiniz olmuyor mu? Online alternatifler de cok degerli.',
    content: `
# Online Atolyelerin Avantajlari

Pandemi sonrasi dunya online egitimleri daha erisilebiir hale getirdi.

## Avantajlar
- Cogrfik kistlama yok
- Esnek zaman
- Kayit imkani
- Daha uygun fiyatlar

## Dezavantajlar
- Yuz yuze etkilesim eksikligi
- Dikkat daginjligi riski
    `,
    coverImage: '/images/blog/online.jpg',
    author: {
      name: 'Zeynep Demir'
    },
    publishedAt: '2026-03-28',
    category: 'Egitim',
    tags: ['online', 'uzaktan-egitim', 'teknoloji'],
    readTime: 3
  },
  {
    id: '4',
    title: 'Liderlik Becerilerinizi Nasil Gelistirirsiniz?',
    slug: 'liderlik-becerilerinizi-nasil-gelistirirsiniz',
    excerpt: 'Liderlik dogal bir yetenek mi yoksa ogrenilen bir beceri mi? Iste cevabi.',
    content: `
# Liderlik Becerilerinizi Nasil Gelistirirsiniz?

Liderlik hem dogal yetenekler hem de ogrenilen beceriler gerektirir.

## Temel Liderlik Becerileri
- Iletisim
- Empati
- Karar verme
- Vizon olusturma
- Takim yonetimi
    `,
    coverImage: '/images/blog/leadership.jpg',
    author: {
      name: 'Mehmet Oz'
    },
    publishedAt: '2026-03-20',
    category: 'Kisisel Gelisim',
    tags: ['liderlik', 'gelisim', 'beceri'],
    readTime: 6
  }
];

export const cities = [
  'Tum Sehirler',
  'Istanbul',
  'Ankara',
  'Izmir',
  'Bursa',
  'Antalya',
  'Online'
];

export const levels = [
  { value: 'hepsi', label: 'Tum Seviyeler' },
  { value: 'lise', label: 'Lise' },
  { value: 'ortaokul', label: 'Ortaokul' }
];
