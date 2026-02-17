import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import Stats from '@/components/home/Stats';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import Categories from '@/components/home/Categories';
import WhySparkle from '@/components/home/WhySparkle';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';
import OfficeGallery from '@/components/home/OfficeGallery';

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <Stats />
      <FeaturedPrograms />
      <Categories />
      <OfficeGallery />
      <WhySparkle />
      {/* <Testimonials /> */}
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
