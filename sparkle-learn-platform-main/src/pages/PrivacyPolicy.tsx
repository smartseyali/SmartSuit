import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShieldCheck, Lock, Eye, FileLock } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <main className="min-h-screen">
            <Navbar />
            <section className="pt-32 pb-20 bg-foreground text-primary-foreground text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Privacy <span className="text-accent">Policy</span></h1>
                    <p className="text-primary-foreground/70 max-w-2xl mx-auto">Your privacy is important to us. Learn how we handle your data.</p>
                </div>
            </section>
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-card p-8 md:p-12 rounded-3xl shadow-soft border border-border/50">
                        <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                        <p className="text-muted-foreground mb-8">We collect information you provide directly to us when you register for a course, sign up for our newsletter, or contact us for support.</p>
                        <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                        <p className="text-muted-foreground mb-8">We use the information we collect to provide, maintain, and improve our services, and to communicate with you about your account and our programs.</p>
                        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex gap-4">
                            <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                            <p className="text-sm text-foreground">We never sell your personal information to third parties. Your data is encrypted and stored securely.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default PrivacyPolicy;
