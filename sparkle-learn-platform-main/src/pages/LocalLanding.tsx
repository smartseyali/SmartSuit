import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/common/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';

const CoimbatoreLanding = () => {
    return (
        <main className="min-h-screen bg-background">
            <SEO
                title="Best Allied Health Science Courses in Coimbatore | Sparkle AHS"
                description="Looking for Allied Health Science courses in Coimbatore? Sparkle AHS offers diploma and degree programs with hands-on clinical training at top hospitals in Coimbatore."
                schema={{
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "What is the best allied health science institute in Coimbatore?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Sparkle Allied Health Science is a leading institute in Coimbatore offering B.Sc and Diploma courses with hands-on clinical training at premium multi-specialty hospitals."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Does Sparkle Allied Health Science offer diploma courses?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Yes, we offer both B.Sc and 1-year Diploma courses in medical science and hospital management designed for immediate employability."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Where is Sparkle Allied Health Science located?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Our Coimbatore campus is located near Sri Chaitanya Techno School, Avinashi Road, Neelambur, Coimbatore - 641062."
                            }
                        }
                    ]
                }}
            />
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-20 bg-hero-gradient relative">
                <div className="container mx-auto px-4 text-center text-primary-foreground relative z-10">
                    <span className="bg-accent/20 text-accent-foreground px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6 inline-block">Top Ranked in Coimbatore</span>
                    <h1 className="text-4xl md:text-6xl font-display font-black mb-6 leading-tight">
                        Allied Health Science <br /> <span className="text-accent italic">in Coimbatore</span>
                    </h1>
                    <p className="text-xl opacity-80 max-w-2xl mx-auto mb-10">
                        Join the most trusted paramedical institute in Coimbatore. Get clinical rotations at premium hospitals and start your healthcare career today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="xl" variant="hero" asChild>
                            <Link to="/programs">Explore Programs</Link>
                        </Button>
                        <Button size="xl" variant="heroOutline" asChild>
                            <Link to="/apply">Check Eligibility</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Local Trust Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                                Why Students in <span className="text-primary">Coimbatore</span> Choose Us
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Coimbatore is a healthcare hub, and Sparkle AHS sits at the heart of it. Our clinical partners include the top multi-specialty hospitals in the region, providing our students with unparalleled exposure.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Clinical training at Coimbatore's top hospitals",
                                    "Expert faculty with 15+ years of experience",
                                    "92% Placement record in local healthcare chains",
                                    "Flexible fee payments and scholarship support"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-foreground font-bold italic">
                                        <CheckCircle2 className="text-primary w-6 h-6" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="p-6 bg-secondary/50 rounded-3xl border border-border inline-flex items-center gap-4">
                                <MapPin className="text-primary w-8 h-8" />
                                <div>
                                    <h4 className="font-bold">Visit our Coimbatore Campus</h4>
                                    <p className="text-sm text-muted-foreground">Neelambur, Avinashi Road, Coimbatore</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-elevated border-8 border-white">
                                <img
                                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop"
                                    alt="Coimbatore Medical Training"
                                    title="Coimbatore Medical Training"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-10 -right-10 bg-primary text-primary-foreground p-10 rounded-3xl shadow-glow-primary max-w-xs animate-bounce-slow">
                                <h3 className="text-4xl font-black mb-2">300+</h3>
                                <p className="text-sm opacity-80 font-bold uppercase tracking-widest">Hiring Partners in TN</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Overview */}
            <section className="py-20 bg-secondary/30">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-12">Premier Programs</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "B.Sc Medical Lab Technology", duration: "3 Years" },
                            { title: "B.Sc Operation Theatre Technology", duration: "3 Years" },
                            { title: "Diploma in Hospital Management", duration: "1 Year" }
                        ].map((course, i) => (
                            <div key={i} className="bg-card p-8 rounded-3xl border border-border/50 hover:shadow-elevated transition-all text-left group">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{course.title}</h3>
                                <p className="text-muted-foreground text-sm mb-6">Master the skills needed in top-tier diagnostic centers and clinical setups in Coimbatore.</p>
                                <Link to="/programs" className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all uppercase text-xs tracking-widest">
                                    Learn More <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default CoimbatoreLanding;
