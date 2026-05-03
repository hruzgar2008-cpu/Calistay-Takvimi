import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { FeaturedEvents } from '@/components/featured-events';
import { EventsSection } from '@/components/events-section';
import { BlogPreview } from '@/components/blog-preview';
import { Newsletter } from '@/components/newsletter';
import { sampleEvents } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedEvents events={sampleEvents} />
        <EventsSection events={sampleEvents} />
        <BlogPreview />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
