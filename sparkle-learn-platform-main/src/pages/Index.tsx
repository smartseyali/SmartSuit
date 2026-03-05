import { lazy, Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/common/SEO';
import HeroSection from '@/components/home/HeroSection';

const Stats = lazy(() => import('@/components/home/Stats'));
const FeaturedPrograms = lazy(() => import('@/components/home/FeaturedPrograms'));
const Categories = lazy(() => import('@/components/home/Categories'));
const WhySparkle = lazy(() => import('@/components/home/WhySparkle'));
const CTASection = lazy(() => import('@/components/home/CTASection'));
const OfficeGallery = lazy(() => import('@/components/home/OfficeGallery'));
const RecentBlog = lazy(() => import('@/components/home/RecentBlog'));
const SEOContent = lazy(() => import('@/components/home/SEOContent'));

const Index = () => {
  return (
    <main className="min-h-screen">
      <SEO
        title="Sparkle Allied Health Institute | Diploma Courses"
        description="Join Sparkle Allied Health Science, the top allied health science institute in Coimbatore. Learn premium Diploma & Medical Lab programs at our Neelambur campus."
      />
      <Navbar />
      <HeroSection />

      {/* Defer loading below-the-fold content to maximize mobile Lighthouse scores */}
      <Suspense fallback={<div className="h-32" />}>
        <Stats />
        <FeaturedPrograms />
        <Categories />
        <SEOContent />
        <OfficeGallery />
        <WhySparkle />
        <RecentBlog />
        <CTASection />
      </Suspense>

      <Footer />
    </main>
  );
};

export default Index;
