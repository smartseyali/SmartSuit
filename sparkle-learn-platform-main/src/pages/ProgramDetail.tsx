import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Clock, MapPin, ArrowLeft, CheckCircle2, GraduationCap,
  Briefcase, ChevronDown, Play, Users, Award
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useProgram } from '@/hooks/usePrograms';

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: program, isLoading, error } = useProgram(id || '');

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-4 text-muted-foreground">Loading program details...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !program) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">Program Not Found</h1>
          <p className="text-muted-foreground mb-8">
            {error ? (error as Error).message : "The program you're looking for doesn't exist."}
          </p>
          <Button asChild>
            <Link to="/programs">Browse All Programs</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Programs</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground animate-fade-up">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-block bg-primary-foreground/10 text-primary-foreground text-sm font-semibold px-4 py-1 rounded-full border border-primary-foreground/20">
                  {program.category}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground text-sm font-semibold px-4 py-1 rounded-full shadow-glow-accent">
                  <Award className="w-4 h-4" />
                  Certified by Bharathiyar Univ.
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
                {program.name}
              </h1>
              <p className="text-lg text-primary-foreground/80 mb-8">
                {program.description}
              </p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{program.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{program.mode}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  <span>Certificate Included</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/apply">Apply Now</Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/apply" className="gap-2">
                    <Play className="w-5 h-5" />
                    Download Brochure
                  </Link>
                </Button>
              </div>
            </div>

            {/* Program Image */}
            <div className="relative hidden lg:block animate-fade-up delay-200">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={program.image}
                  alt={program.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Price Badge */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-elevated p-4">
                <div className="text-sm text-muted-foreground">Program Fee</div>
                <div className="text-2xl font-display font-bold text-primary">{program.fees}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Key Highlights */}
              <div className="animate-fade-up">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Key Highlights
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {program.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border/50"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* About Program */}
              {program.longDescription && (
                <div className="animate-fade-up">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                    About this Program
                  </h2>
                  <div 
                    className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: program.longDescription }} 
                  />
                </div>
              )}

              {/* Curriculum */}
              {program.curriculum && program.curriculum.length > 0 && (
                <div className="animate-fade-up delay-100">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                    Curriculum
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {program.curriculum.map((module, index) => (
                      <AccordionItem
                        key={index}
                        value={`module-${index}`}
                        className="bg-card rounded-xl border border-border/50 px-6 overflow-hidden"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                              {index + 1}
                            </div>
                            <span className="font-display font-semibold text-foreground">
                              {module.title}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <ul className="ml-14 space-y-2">
                            {module.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="flex items-center gap-2 text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              {/* Eligibility */}
              {program.eligibility && program.eligibility.length > 0 && (
                <div className="animate-fade-up delay-200">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                    Eligibility
                  </h2>
                  <div className="bg-card rounded-xl border border-border/50 p-6">
                    <ul className="space-y-3">
                      {program.eligibility.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Career Outcomes */}
              {program.careerOutcomes && program.careerOutcomes.length > 0 && (
                <div className="animate-fade-up delay-300">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                    Career Opportunities
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {program.careerOutcomes.map((outcome, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/50"
                      >
                        <Briefcase className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-foreground font-medium">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Price Card */}
                <div className="bg-card rounded-2xl shadow-elevated border border-border/50 overflow-hidden animate-fade-up">
                  <div className="p-6 bg-primary text-primary-foreground">
                    <div className="text-sm opacity-80 mb-1">Program Fee</div>
                    <div className="text-3xl font-display font-bold">{program.fees}</div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span className="text-foreground">{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <span className="text-foreground">{program.mode} Learning</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Award className="w-5 h-5 text-muted-foreground" />
                      <span className="text-foreground">Industry Certificate</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <span className="text-foreground">1:1 Mentorship</span>
                    </div>

                    <div className="pt-4 space-y-3">
                      <Button variant="default" size="lg" className="w-full" asChild>
                        <Link to="/apply">Apply Now</Link>
                      </Button>
                      <Button variant="outline" size="lg" className="w-full" asChild>
                        <Link to="/apply">Download Brochure</Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Need Help Card */}
                <div className="bg-secondary/50 rounded-2xl p-6 border border-border/50 animate-fade-up delay-100">
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    Need Guidance?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our career counsellors are here to help you choose the right program.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/apply">Talk to Counsellor</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProgramDetail;
