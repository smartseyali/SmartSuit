import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Clock, MapPin, ArrowLeft, CheckCircle2, GraduationCap,
  Briefcase, ChevronDown, Play, Users, Award, Share2, ArrowRight
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useProgram, usePrograms } from '@/hooks/usePrograms';
import { toast } from 'sonner';
import SEO from '@/components/common/SEO';

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: program, isLoading, error } = useProgram(id || '');
  const { data: allPrograms } = usePrograms();

  const relatedPrograms = useMemo(() => {
    if (!program || !allPrograms) return [];
    return allPrograms
      .filter(p => p.category === program.category && p.id !== program.id)
      .slice(0, 3);
  }, [program, allPrograms]);

  const handleShare = async () => {
    const shareData = {
      title: program?.name,
      text: program?.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing", err);
    }
  };

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
      <SEO
        title={`${program.name} | Allied Health Programs`}
        description={program.description}
        schema={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": program.name,
          "description": program.description,
          "provider": {
            "@type": "EducationalOrganization",
            "name": "Sparkle Allied Health Science",
            "sameAs": "https://sparkleahs.com"
          },
          "offers": {
            "@type": "Offer",
            "category": "Education"
          }
        }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-8 animate-fade-up">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/programs" className="hover:text-primary-foreground transition-colors">Programs</Link>
            <span>/</span>
            <span className="text-primary-foreground font-medium truncate max-w-[200px]">{program.name}</span>
          </nav>

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
                  <Link to={`/apply?program=${program.id}`}>Apply Now</Link>
                </Button>
                <Button
                  variant="heroOutline"
                  size="xl"
                  onClick={handleShare}
                  className="gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Share Program
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
              {/* <div className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-elevated p-4">
                <div className="text-sm text-muted-foreground">Program Fee</div>
                <div className="text-2xl font-display font-bold text-primary">{program.fees}</div>
              </div> */}
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
                        <Link to={`/apply?program=${program.id}`}>Apply Now</Link>
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
                    <Link to={`/apply?program=${program.id}`}>Talk to Counsellor</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Programs Section */}
      {
        relatedPrograms.length > 0 && (
          <section className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-display font-bold text-foreground">
                  Related <span className="text-primary">Programs</span>
                </h2>
                <Button variant="outline" asChild>
                  <Link to={`/programs?category=${program.category}`}>View Category</Link>
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPrograms.map((p, index) => (
                  <Link
                    key={p.id}
                    to={`/programs/${p.id}`}
                    className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 border border-border/50 animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        title={p.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display font-bold text-foreground text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{p.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ArrowRight className="w-4 h-4" />
                          <span>View Details</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      }

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground leading-tight">
                Not sure which course is <span className="text-accent underline decoration-accent/30 underline-offset-8">right for you?</span>
              </h2>
              <p className="text-xl text-primary-foreground/80">
                Get free career counselling from our experts and take the first step towards a successful career.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl" asChild className="shadow-glow-accent">
                  <Link to="/apply">Book Free Counselling</Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Resources Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Knowledge Cluster</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground leading-tight">
                Career & Admission <span className="text-primary italic">Resources</span>
              </h2>
            </div>
            <Button variant="outline" asChild className="rounded-2xl border-2 hover:bg-primary hover:text-primary-foreground transition-all">
              <Link to="/blog">Browse All Insights</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Link
              to="/blog/what-is-allied-health-science"
              className="group bg-card p-8 rounded-[2.5rem] border border-border/50 hover:shadow-elevated transition-all flex flex-col md:flex-row items-center gap-6"
            >
              <div className="w-20 h-20 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <GraduationCap className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">What is Allied Health Science?</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">Complete guide to the field, eligibility, and the expanding scope in India.</p>
              </div>
            </Link>
            <Link
              to="/blog/allied-health-science-career-guide"
              className="group bg-card p-8 rounded-[2.5rem] border border-border/50 hover:shadow-elevated transition-all flex flex-col md:flex-row items-center gap-6"
            >
              <div className="w-20 h-20 shrink-0 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                <Briefcase className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold group-hover:text-accent transition-colors">Career Guide – Courses & Growth</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">Salary expectations, top job roles, and growth opportunities for graduates.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main >
  );
};

export default ProgramDetail;
