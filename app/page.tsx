import { Header } from '@/components/header';
import { HeroCarousel } from '@/components/hero-carousel';
import { CategoryGrid } from '@/components/category-grid';
import { FeaturedProducts } from '@/components/featured-products';
import { FeaturedBrands } from '@/components/featured-brands';
import { WhyChooseUs } from '@/components/why-choose-us';
import { NewsletterCTA } from '@/components/newsletter-cta';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroCarousel />
        <CategoryGrid />
        <FeaturedProducts />
        <FeaturedBrands />
        <WhyChooseUs />
        <NewsletterCTA />
      </main>
      <Footer />
    </div>
  );
}
