import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Programs = lazy(() => import("./pages/Programs"));
const ProgramDetail = lazy(() => import("./pages/ProgramDetail"));
const Apply = lazy(() => import("./pages/Apply"));
const Gallery = lazy(() => import("./pages/Gallery"));
const About = lazy(() => import("./pages/About"));
const Terms = lazy(() => import("./pages/Terms"));
const Faqs = lazy(() => import("./pages/Faqs"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const CoimbatoreLanding = lazy(() => import("./pages/LocalLanding"));
const NotFound = lazy(() => import("./pages/NotFound"));

import { useEffect } from "react";
import { initPixel, MetaPixelObserver } from "./lib/meta-pixel";
import { AnalyticsObserver } from "./lib/google-analytics";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/layout/ScrollToTop";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initPixel();
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <MetaPixelObserver />
            <AnalyticsObserver />
            <ScrollToTop />
            <Suspense fallback={
              <div className="h-screen w-full flex items-center justify-center bg-background">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/programs/:id" element={<ProgramDetail />} />
                <Route path="/apply" element={<Apply />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/faqs" element={<Faqs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/allied-health-science-courses-coimbatore" element={<CoimbatoreLanding />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
