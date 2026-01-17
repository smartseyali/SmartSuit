import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ScrollText, ShieldCheck, FileText, Scale } from 'lucide-react';

const TermsAndConditions = () => {
    const sections = [
        {
            icon: FileText,
            title: "1. Agreement to Terms",
            content: "By accessing or using Sparkle Educational Institute services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services."
        },
        {
            icon: ShieldCheck,
            title: "2. Intellectual Property",
            content: "All content provided on Sparkle, including but not limited to text, graphics, logos, images, course materials, and software, is the property of Sparkle Educational Institute and is protected by international copyright laws."
        },
        {
            icon: ScrollText,
            title: "3. User Conduct",
            content: "Users are expected to conduct themselves in a professional and respectful manner. Any form of harassment, cheating, or unauthorized sharing of course content will result in immediate termination of access without refund."
        },
        {
            icon: Scale,
            title: "4. Limitation of Liability",
            content: "Sparkle Educational Institute shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of our services."
        }
    ];

    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Header Section */}
            <section className="pt-32 pb-20 bg-foreground text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Terms & <span className="text-accent">Conditions</span></h1>
                    <p className="text-primary-foreground/70 max-w-2xl mx-auto">
                        Last updated: January 17, 2026. Please read these terms carefully before using our services.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-card p-8 md:p-12 rounded-3xl shadow-soft border border-border/50 space-y-12">

                        <div className="prose prose-slate max-w-none">
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Welcome to Sparkle Educational Institute. These terms and conditions outline the rules and regulations for the use of Sparkle's Website and Learning Management System.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8">
                            {sections.map((section, i) => (
                                <div key={i} className="flex gap-6">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                        <section.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-bold text-foreground">{section.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-border">
                            <h3 className="text-xl font-bold mb-4">5. Contact Us</h3>
                            <p className="text-muted-foreground mb-6">
                                If you have any questions about these Terms and Conditions, please contact us at:
                            </p>
                            <div className="bg-accent/5 p-6 rounded-2xl border border-primary/20">
                                <p className="font-medium text-foreground">Sparkle Educational Institute</p>
                                <p className="text-muted-foreground">Legal Department</p>
                                <p className="text-muted-foreground">legal@sparkle.edu</p>
                                <p className="text-muted-foreground">Kathir College Campus, Coimbatore - 641062</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default TermsAndConditions;
