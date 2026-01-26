import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Target, Eye, ShieldCheck, Award, Users, BookOpen } from 'lucide-react';

import { stats } from '@/data/static';

const About = () => {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-hero-gradient relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-10 left-10 w-64 h-64 bg-primary-foreground/20 rounded-full blur-2xl" />
                </div>
                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6 animate-fade-up">
                            Empowering Careers Through
                            <span className="block text-accent mt-2">Specialized Education</span>
                        </h1>
                        <p className="text-xl text-primary-foreground/80 animate-fade-up delay-100">
                            Sparkle is India's leading platform for industry-ready certifications in Medical Science and Advanced Management.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Mission */}
                        <div className="bg-card p-10 rounded-3xl shadow-card border border-border/50 animate-fade-up delay-200">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                <Target className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Our Mission</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                To bridge the gap between academic learning and industry requirements by providing high-quality, clinical, and management education that empowers students to excel in their professional journeys.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-card p-10 rounded-3xl shadow-card border border-border/50 animate-fade-up delay-300">
                            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                                <Eye className="w-8 h-8 text-accent" />
                            </div>
                            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Our Vision</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                To become the most trusted global destination for specialized vocational training, recognized for creating a skilled workforce that drives innovation in healthcare and corporate operations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section (Re-used for consistency) */}
            <section className="py-16 bg-secondary/50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={stat.label} className="text-center animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                                <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* University Affiliation - New Section */}
            <section className="py-16 bg-accent/5 border-y border-border/50">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-6">
                            Official Accreditation
                        </span>
                        <h2 className="text-3xl font-display font-bold text-foreground mb-8">
                            Certified by <span className="text-primary">Bharathiyar University</span>
                        </h2>
                        <div className="bg-card p-8 md:p-12 rounded-3xl shadow-lg border border-border flex flex-col md:flex-row items-center gap-8 animate-fade-up">
                            <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center flex-shrink-0">
                                <Award className="w-12 h-12 text-primary" />
                            </div>
                            <div className="text-left space-y-3">
                                <p className="text-lg text-foreground font-medium">
                                    We are proud to be officially certified to conduct specialized courses and award professional certificates in partnership with Bharathiyar University.
                                </p>
                                <p className="text-muted-foreground">
                                    This affiliation ensures that our curriculum meets rigorous academic standards and that your certification is recognized and valued across the industry.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story / Expertise */}
            <section className="py-24 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 relative">
                            <div className="relative z-10 rounded-3xl overflow-hidden shadow-elevated animate-scale-in">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop"
                                    alt="Team Collaboration"
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/20 rounded-full blur-2xl -z-10" />
                            <div className="absolute -top-6 -left-6 w-48 h-48 bg-primary/20 rounded-full blur-2xl -z-10" />
                        </div>

                        <div className="lg:w-1/2 space-y-6 animate-fade-up">
                            <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Story</span>
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground leading-tight">
                                A Decade of Excellence in
                                <span className="text-primary"> Practical Training</span>
                            </h2>
                            <p className="text-muted-foreground text-lg">
                                Founded with a vision to transform vocational education in India, Sparkle has evolved from a small training center to a comprehensive learning platform. We specialize in areas that matter most — Healthcare and Management.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                Our approach combines rigorous theoretical knowledge with mandatory clinical rotations. Backed by Bharathiyar University certification, our graduates possess the verified competency to lead in their fields.
                            </p>
                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="text-primary w-6 h-6" />
                                    <span className="font-medium">Bharathiyar Univ. Certified</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <BookOpen className="text-primary w-6 h-6" />
                                    <span className="font-medium">Modern Curriculum</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Users className="text-primary w-6 h-6" />
                                    <span className="font-medium">Industry Faculty</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Award className="text-primary w-6 h-6" />
                                    <span className="font-medium">Placement Guarantee</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20">
                <div className="container mx-auto px-4 text-center bg-primary rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-8">
                            Ready to Spark Your Career?
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/programs" className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-glow-accent">
                                View Our Courses
                            </a>
                            <a href="/apply" className="bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 px-8 py-4 rounded-xl font-bold hover:bg-primary-foreground/20 transition-all">
                                Speak with a Counsellor
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default About;
