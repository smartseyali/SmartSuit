import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShieldAlert, FileText, Scale, Info, CheckCircle2 } from 'lucide-react';

const Terms = () => {
    const sections = [
        {
            title: "1. Enrollment and Admission",
            icon: <FileText className="w-6 h-6 text-primary" />,
            content: "Admission to Sparkle's specialized programs (Medical Science, Management, and Certifications) is based on the eligibility criteria specified for each course. Applicants must provide valid documentation of their educational background. Sparkle reserves the right to cancel enrollment if any provided information is found to be fraudulent."
        },
        {
            title: "2. Course Fees and Payments",
            icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
            content: "Fees must be paid according to the selected plan (Upfront or Installment). All fees are inclusive of GST unless stated otherwise. Enrollment is confirmed only after the successful receipt of the initial payment. Delayed payments may result in suspension of access to course materials and clinical training."
        },
        {
            title: "3. Refund and Cancellation Policy",
            icon: <ShieldAlert className="w-6 h-6 text-primary" />,
            content: "Students may request a refund within 7 days of enrollment, provided course materials or clinical resources have not been accessed. A nominal processing fee will be deducted for all refunds. Refund requests after 7 days or after the start of practical sessions will not be entertained."
        },
        {
            title: "4. Professional Conduct and Clinical Ethics",
            icon: <Scale className="w-6 h-6 text-primary" />,
            content: "For students enrolled in Medical Science courses involving clinical rotations, adherence to hospital protocols and medical ethics is mandatory. Any breach of patient confidentiality or professional misconduct in a partner facility will lead to immediate expulsion without a refund."
        },
        {
            title: "5. Intellectual Property",
            icon: <Info className="w-6 h-6 text-primary" />,
            content: "All course content, including videos, documents, laboratory manuals, and research materials, are the property of Sparkle Learn Platform. Students are granted a non-transferable license to use these for personal educational purposes only. Redistribution or commercial use is strictly prohibited."
        },
        {
            title: "6. Limitation of Liability",
            icon: <Scale className="w-6 h-6 text-primary" />,
            content: "While Sparkle ensures the highest quality of education and placement support, we do not guarantee employment. The career outcomes mentioned are indicative based on industry trends and alumni performance. Practical training involves inherent risks, and students must follow all safety guidelines."
        }
    ];

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-16 bg-hero-gradient relative">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4 animate-fade-up">
                        Terms and Conditions
                    </h1>
                    <p className="text-primary-foreground/70 animate-fade-up delay-100">
                        Last updated: January 17, 2026
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-card rounded-3xl border border-border/50 shadow-elevated p-8 md:p-12 animate-fade-up delay-200">
                        <div className="prose prose-slate max-w-none">
                            <p className="text-lg text-muted-foreground mb-12">
                                Please read these terms and conditions carefully before using our platform or enrolling in our courses. By accessing Sparkle Learn Platform, you agree to be bound by these terms.
                            </p>

                            <div className="space-y-12">
                                {sections.map((section, index) => (
                                    <div key={index} className="flex gap-6 items-start">
                                        <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10">
                                            {section.icon}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-foreground mb-3">{section.title}</h2>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {section.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-16 p-8 bg-secondary/50 rounded-2xl border border-border">
                                <h3 className="text-lg font-bold text-foreground mb-4">Contact Our Legal Team</h3>
                                <p className="text-muted-foreground mb-0">
                                    If you have any questions regarding these terms, please contact us at:
                                    <br />
                                    <strong>Email:</strong> legal@sparkle.edu
                                    <br />
                                    <strong>Address:</strong> Near Sri Chaitanya Techno School, Avinashi Road, Neelambur, Coimbatore - 641062
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default Terms;
