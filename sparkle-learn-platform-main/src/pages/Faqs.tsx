import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { HelpCircle, GraduationCap, CreditCard, Award, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Faqs = () => {
    const faqCategories = [
        {
            id: 'general',
            title: 'Admission & Enrollment',
            icon: <GraduationCap className="w-5 h-5 text-primary" />,
            questions: [
                {
                    q: "What is the basic eligibility for Medical Science courses?",
                    a: "For most diploma courses like MLT and Patient Care, a 10+2 passing certificate (preferably with Science) is required. Specialized certifications may require a background in healthcare or a relevant degree."
                },
                {
                    q: "Can I enroll in multiple courses simultaneously?",
                    a: "While possible, we recommend focusing on one specialized program at a time, especially for intensive courses like Hospital Administration or MLT which require clinical hours and dedicated study time."
                },
                {
                    q: "How do I apply for a scholarship?",
                    a: "Sparkle offers merit-based scholarships and support for students from economically weaker sections. You can indicate your interest during the 'Apply Now' process or speak directly with our career counsellor."
                }
            ]
        },
        {
            id: 'courses',
            title: 'Course Delivery & Practical Training',
            icon: <HelpCircle className="w-5 h-5 text-primary" />,
            questions: [
                {
                    q: "Are the courses recognized by industry bodies?",
                    a: "Yes, all our Medical Science and Management programs are designed in collaboration with leading hospitals and diagnostic labs, ensuring the certifications are recognized and valued by hiring partners."
                },
                {
                    q: "How does the clinical/practical training work?",
                    a: "For courses like MLT and Patient Care, we have mandatory clinical rotation blocks in our partner hospitals and private diagnostic laboratories to provide hands-on experience."
                },
                {
                    q: "Is the course material available offline?",
                    a: "Yes, students receive comprehensive study kits and manuals. For Hybrid and Online courses, all digital modules can be downloaded for offline viewing through our learning portal."
                }
            ]
        },
        {
            id: 'fees',
            title: 'Fees & Financial Aid',
            icon: <CreditCard className="w-5 h-5 text-primary" />,
            questions: [
                {
                    q: "What are the available payment modes?",
                    a: "We accept all major Credit/Debit cards, UPI, Net Banking, and Bank Transfers. We also offer easy EMI options with 0% interest for eligible students."
                },
                {
                    q: "Is the registration fee refundable?",
                    a: "The registration fee is non-refundable as it covers administrative processing and initial kit allocation. However, tuition fees are subject to our 7-day refund policy."
                }
            ]
        },
        {
            id: 'placements',
            title: 'Placements & Career Support',
            icon: <Award className="w-5 h-5 text-primary" />,
            questions: [
                {
                    q: "Does Sparkle guarantee placements?",
                    a: "We provide 100% placement assistance, which includes resume building, mock interviews, and access to our network of 300+ hiring partners. Our track record shows a 92% placement rate for dedicated students."
                },
                {
                    q: "What kind of companies hire from Sparkle?",
                    a: "Our graduates are hired by leading multi-specialty hospitals, private diagnostic chains, medical research labs, and corporate healthcare organizations across India."
                }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Header */}
            <section className="pt-32 pb-16 bg-hero-gradient relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 relative text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6 animate-fade-up">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-up delay-100">
                        Find answers to common questions about our medical science and management programs, admissions, and career support.
                    </p>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-12">
                        {faqCategories.map((category, catIndex) => (
                            <div key={category.id} className="animate-fade-up" style={{ animationDelay: `${catIndex * 100}ms` }}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        {category.icon}
                                    </div>
                                    <h2 className="text-2xl font-display font-bold text-foreground">
                                        {category.title}
                                    </h2>
                                </div>

                                <Accordion type="single" collapsible className="w-full space-y-4">
                                    {category.questions.map((question, qIndex) => (
                                        <AccordionItem
                                            key={qIndex}
                                            value={`${category.id}-${qIndex}`}
                                            className="bg-card border border-border/50 rounded-2xl px-6 shadow-soft hover:border-primary/20 transition-all overflow-hidden"
                                        >
                                            <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:no-underline py-5">
                                                {question.q}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-6">
                                                {question.a}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="pb-24">
                <div className="container mx-auto px-4">
                    <div className="bg-secondary/50 rounded-[2.5rem] p-12 text-center border border-border/50">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <MessageCircle className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                            Still have questions?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                            Our career experts are available to clarify your doubts and help you choose the right path for your healthcare or management career.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="xl" asChild>
                                <Link to="/apply">Book a Free Consultation</Link>
                            </Button>
                            <Button size="xl" variant="outline" asChild>
                                <a href="tel:+918220928732">Call Us Directly</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default Faqs;
