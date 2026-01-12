import { GraduationCap, Users, Briefcase, Trophy, Target, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: GraduationCap,
    title: 'Expert Faculty',
    description: 'Learn from IIT/IIM alumni and industry practitioners with 10+ years of experience.',
  },
  {
    icon: Target,
    title: 'Industry-Aligned Curriculum',
    description: 'Curriculum designed with top employers to ensure job-ready skills.',
  },
  {
    icon: Briefcase,
    title: 'Hands-on Projects',
    description: '15+ real-world projects and capstone to build your portfolio.',
  },
  {
    icon: Users,
    title: 'Career Services',
    description: 'Dedicated placement team with 300+ hiring partners.',
  },
  {
    icon: Trophy,
    title: 'Certification',
    description: 'Industry-recognized certification upon program completion.',
  },
  {
    icon: HeartHandshake,
    title: 'Mentorship',
    description: '1:1 mentorship sessions with industry experts throughout your journey.',
  },
];

const WhySparkle = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            The Sparkle Advantage
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join 50,000+ professionals who accelerated their careers with our proven methodology.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-500 border border-border/50 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display font-bold text-foreground text-xl mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySparkle;
