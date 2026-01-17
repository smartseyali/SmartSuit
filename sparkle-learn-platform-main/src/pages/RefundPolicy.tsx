import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CreditCard, RefreshCcw, AlertCircle } from 'lucide-react';

const RefundPolicy = () => {
    return (
        <main className="min-h-screen">
            <Navbar />
            <section className="pt-32 pb-20 bg-foreground text-primary-foreground text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Refund <span className="text-accent">Policy</span></h1>
                    <p className="text-primary-foreground/70 max-w-2xl mx-auto">Transparent and fair refund guidelines for our learners.</p>
                </div>
            </section>
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-card p-8 md:p-12 rounded-3xl shadow-soft border border-border/50">
                        <h2 className="text-2xl font-bold mb-4">Course Cancellation</h2>
                        <p className="text-muted-foreground mb-8">You can request a full refund within 7 days of enrollment, provided you have not accessed more than 20% of the course content.</p>
                        <h2 className="text-2xl font-bold mb-4">Refund Process</h2>
                        <p className="text-muted-foreground mb-8">To request a refund, please email refunds@sparkle.edu with your enrollment details. Refunds are processed within 5-7 business days.</p>
                        <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/20 flex gap-4">
                            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                            <p className="text-sm text-foreground">Special batches and fast-track programs might have different refund terms as mentioned during the enrollment process.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default RefundPolicy;
