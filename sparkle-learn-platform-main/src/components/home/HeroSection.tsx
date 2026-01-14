import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, Users, Award, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/30 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 pt-32 pb-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          {/* Left Content */}
          <div className="text-primary-foreground space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 border border-primary-foreground/20 animate-fade-up">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-sm font-medium">We're hiring — Join our startup team</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight animate-fade-up delay-100">
              Join Our Mission to Transform Medical Science
              <span className="block text-accent mt-2">Build Healthcare Solutions with Us</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl animate-fade-up delay-200">
              We're a fast-growing medtech startup innovating in clinical education and healthcare tools. Join curious engineers, clinicians, and researchers to ship products, impact care, and grow fast — equity and learning opportunities available.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
              <Button variant="hero" size="xl" asChild>
                <Link to="/careers">
                  View Open Roles
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/about" className="gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                  Meet the Team
                </Link>
              </Button>
            </div>

            {/* Hiring Badges */}
            <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-primary-foreground/10 animate-fade-up delay-400">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm text-primary-foreground/70">Team Members</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-primary-foreground/70">Products Launched</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">30+</div>
                  <div className="text-sm text-primary-foreground/70">Clinical Partners</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Cards */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square">
              {/* Main Card - Open Role */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-card rounded-2xl shadow-elevated overflow-hidden animate-float">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop"
                  alt="Team at work"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-muted-foreground mb-2">Open Role</div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-2">Full-Stack Engineer</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Remote</span>
                    <span>•</span>
                    <span>Full-time</span>
                  </div>
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute top-10 right-0 bg-card rounded-xl shadow-elevated p-4 animate-fade-in delay-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Open Roles</div>
                    <div className="text-xl font-bold text-foreground">8</div>
                  </div>
                </div>
              </div>

              {/* Floating Avatar Group */}
              <div className="absolute bottom-20 left-0 bg-card rounded-xl shadow-elevated p-4 animate-fade-in delay-700">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" alt="" className="w-10 h-10 rounded-full border-2 border-card object-cover" />
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100" alt="" className="w-10 h-10 rounded-full border-2 border-card object-cover" />
                    <img src="https://images.unsplash.com/photo-1545996124-1b1f9f8b8a2f?w=100" alt="" className="w-10 h-10 rounded-full border-2 border-card object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Current Team</div>
                    <div className="text-xs text-muted-foreground">Join 50+ builders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
