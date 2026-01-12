import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-hero-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary-foreground rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 animate-fade-up">
            Ready to Transform
            <span className="block text-accent">Your Career?</span>
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-fade-up delay-100">
            Take the first step towards your dream career. Our career counsellors are here to guide you on the right path.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-200">
            <Button variant="hero" size="xl" asChild>
              <Link to="/apply">
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/apply" className="gap-3">
                <Phone className="w-5 h-5" />
                Talk to Counsellor
              </Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-primary-foreground/70 animate-fade-up delay-300">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span>Free career guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span>Counsellor available 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
