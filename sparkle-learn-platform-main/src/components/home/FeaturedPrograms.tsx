import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { usePrograms } from '@/hooks/usePrograms';
import { Clock, MapPin, ArrowRight, Award } from 'lucide-react';

const FeaturedPrograms = () => {
  const { data: programs, isLoading } = usePrograms();
  const featuredPrograms = programs ? programs.slice(0, 4) : [];

  if (isLoading) {
    return <div className="py-20 text-center">Loading featured programs...</div>;
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Our Programs
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Featured Programs
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Industry-aligned programs designed with top employers. Get job-ready skills with our comprehensive curriculum.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPrograms.map((program, index) => (
            <Link
              key={program.id}
              to={`/programs/${program.id}`}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 animate-fade-up border border-border/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {program.category}
                  </span>
                </div>
                {/* Certification Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-primary text-[10px] font-bold px-2 py-1 rounded-full shadow-sm border border-primary/10">
                    <Award className="w-3 h-3" />
                    Bharathiyar Univ. Certified
                  </span>
                </div>
              </div>

              {/* Content */}
              < div className="p-6" >
                <h3 className="font-display font-bold text-foreground text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {program.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{program.mode}</span>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/programs">
              View All Programs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div >
    </section >
  );
};

export default FeaturedPrograms;
