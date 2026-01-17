import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            toast({
                title: "Message Sent!",
                description: "We'll get back to you as soon as possible.",
            });
            (e.target as HTMLFormElement).reset();
        }, 1500);
    };

    const contactInfo = [
        {
            icon: Phone,
            title: "Call Us",
            details: ["+91 82209 28732", "+91 93638 82960"],
            sub: "Mon - Sat, 9am - 6pm"
        },
        {
            icon: Mail,
            title: "Email Us",
            details: ["hello@sparkle.edu", "admissions@sparkle.edu"],
            sub: "24/7 online support"
        },
        {
            icon: MapPin,
            title: "Visit Us",
            details: ["Kathir College Campus, Avinashi Road,", "Neelambur, Coimbatore - 641062"],
            sub: "Get directions"
        }
    ];

    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-foreground text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Get in <span className="text-accent">Touch</span></h1>
                    <p className="text-xl text-primary-foreground/70 max-w-2xl mx-auto">
                        Have questions about our programs or admissions? Our team is here to help you every step of the way.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Contact Info Cards */}
                        <div className="lg:col-span-1 space-y-8">
                            {contactInfo.map((info, i) => (
                                <div key={i} className="flex gap-6 p-6 rounded-2xl bg-card border border-border/50 shadow-soft">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                        <info.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-2">{info.title}</h3>
                                        {info.details.map((detail, idx) => (
                                            <p key={idx} className="text-muted-foreground">{detail}</p>
                                        ))}
                                        <p className="text-primary text-sm font-medium mt-2">{info.sub}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="p-8 rounded-2xl bg-primary text-primary-foreground">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <MessageSquare className="w-6 h-6" />
                                    Student Support
                                </h3>
                                <p className="mb-6 text-primary-foreground/80">
                                    Already a student? Access the student portal for faster assistance or contact your mentor directly.
                                </p>
                                <Button variant="heroOutline" className="w-full">Student Login</Button>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-card p-8 md:p-12 rounded-3xl shadow-elevated border border-border/50">
                                <h2 className="text-3xl font-display font-bold mb-8">Send us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground">First Name</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="John"
                                                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground">Last Name</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Doe"
                                                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Subject</label>
                                        <select className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                                            <option>General Inquiry</option>
                                            <option>Program Admissions</option>
                                            <option>Corporate Training</option>
                                            <option>Partnership Opportunities</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Message</label>
                                        <textarea
                                            required
                                            rows={5}
                                            placeholder="How can we help you?"
                                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                        ></textarea>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full py-6 text-lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                        <Send className="w-5 h-5 ml-2" />
                                    </Button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Map Section Placeholder */}
            <section className="py-20 bg-accent/5">
                <div className="container mx-auto px-4">
                    <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-soft border border-border/50">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.035345781358!2d77.0601331!3d11.0734268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85642d65cd94b%3A0xc07474a0048af393!2sKathir%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default Contact;
