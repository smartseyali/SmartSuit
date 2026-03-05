import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/common/SEO';
import HeroSection from '@/components/home/HeroSection';
import Stats from '@/components/home/Stats';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import Categories from '@/components/home/Categories';
import WhySparkle from '@/components/home/WhySparkle';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

import OfficeGallery from '@/components/home/OfficeGallery';
import RecentBlog from '@/components/home/RecentBlog';
import SEOContent from '@/components/home/SEOContent';

const Index = () => {
  return (
    <main className="min-h-screen">
      <SEO
        title="Sparkle Allied Health Institute | Diploma Courses"
        description="Join Sparkle Allied Health Science, the top allied health science institute in Coimbatore. Learn premium Diploma & Medical Lab programs at our Neelambur campus."
      />
      <Navbar />
      <HeroSection />
      <Stats />
      <FeaturedPrograms />
      <Categories />
      <SEOContent />
      <OfficeGallery />
      <WhySparkle />
      {/* <Testimonials /> */}
      <RecentBlog />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
