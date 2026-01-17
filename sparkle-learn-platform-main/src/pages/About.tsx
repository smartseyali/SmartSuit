import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Target, Eye, Award, Users } from 'lucide-react';

const About = () => {
    const values = [
        {
            icon: Target,
            title: "Our Mission",
            description: "To empower individuals with the skills and knowledge needed to excel in the healthcare sector through practical, clinical-aligned education."
        },
        {
            icon: Eye,
            title: "Our Vision",
            description: "To be the world's most learner-centric medical education platform, where anyone, anywhere can transform their healthcare career."
        },
        {
            icon: Award,
            title: "Our Values",
            description: "Clinical excellence, integrity, and medical ethics are at the core of everything we do. We believe in clinical practice."
        },
        {
            icon: Users,
            title: "Our Community",
            description: "Join over 50,000+ graduates who have successfully transitioned into high-growth healthcare careers at top hospitals."
        }
    ];

    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-foreground text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Empowering Careers,<br /><span className="text-accent">Transforming Futures</span></h1>
                    <p className="text-xl text-primary-foreground/70 max-w-2xl mx-auto">
                        Sparkle Educational Institute is more than just a learning platform. We are a community dedicated to helping you achieve your professional goals.
                    </p>
                </div>
            </section>

            {/* Overview Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1576091160550-21735999181c?auto=format&fit=crop&q=80&w=1000"
                                    alt="Medical professionals"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-accent p-8 rounded-2xl shadow-xl hidden md:block">
                                <p className="text-4xl font-bold mb-1">10+</p>
                                <p className="text-sm font-medium">Years of Excellence</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Why We Started Sparkle</h2>
                            <p className="text-lg text-muted-foreground">
                                In an era of rapid technological advancement, traditional education often fails to keep pace with industry demands. Sparkle was founded to bridge this gap.
                            </p>
                            <p className="text-lg text-muted-foreground">
                                We believe that quality education should be accessible, practical, and directly linked to career outcomes. Our programs are designed by industry experts and taught by practitioners who bring real-world experience into the classroom.
                            </p>
                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-primary mb-1">95%</h3>
                                    <p className="text-sm text-muted-foreground">Placement Rate</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-primary mb-1">500+</h3>
                                    <p className="text-sm text-muted-foreground">Hiring Partners</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-accent/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Our Core Values</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            These principles guide everything we do, from designing our curriculum to supporting our students.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v, i) => (
                            <div key={i} className="bg-card p-8 rounded-2xl shadow-soft border border-border/50 hover:shadow-elevated transition-all duration-300">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                    <v.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {v.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section Placeholder */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-12">Leadership That Inspires</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group">
                                <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 relative">
                                    <img
                                        src={`https://images.unsplash.com/photo-${i === 1 ? '1507003211169-0a1dd7228f2d' : i === 2 ? '1573496359142-b8d87734a5a2' : '1500648767791-00dcc994a43e'}?auto=format&fit=crop&q=80&w=500`}
                                        alt="Team member"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-xl font-bold">Team Member {i}</h3>
                                <p className="text-primary font-medium mb-2">Director of Education</p>
                                <p className="text-sm text-muted-foreground">Former lead at Fortune 500 tech company with 15 years of experience.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default About;
