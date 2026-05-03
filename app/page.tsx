import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { HomeEvents } from '@/components/home-events';
import { BlogPreview } from '@/components/blog-preview';
import { Newsletter } from '@/components/newsletter';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HomeEvents />
        <BlogPreview />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
