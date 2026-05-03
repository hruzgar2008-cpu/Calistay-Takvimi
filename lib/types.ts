export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  startDate: string;
  endDate: string;
  city: string;
  location: string;
  level: 'lise' | 'ortaokul' | 'hepsi';
  institution: string;
  language: 'Turkce' | 'Ingilizce' | 'Her Ikisi';
  link: string;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
  bannerImage: string;
  organizer: {
    name: string;
    logo?: string;
    description?: string;
  };
  isFeatured?: boolean;
  tags?: string[];
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  category: string;
  tags: string[];
  readTime: number;
  isTrending?: boolean;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  favoriteEvents: string[];
  emailNotifications: boolean;
  createdAt: string;
}
