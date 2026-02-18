import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+91 82209 28732", "+91 93638 82960"],
      sub: "Mon - Sat, 9:00 AM - 6:00 PM"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["hello@sparkle.edu", "admissions@sparkle.edu"],
      sub: "Online support 24/7"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: ["Near Sri Chaitanya Techno School, Avinashi Road,", "Neelambur, Coimbatore - 641062"],
      sub: "Get directions on map"
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-hero-gradient relative">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4 animate-fade-up">
            Get in Touch
          </h1>
          <p className="text-xl text-primary-foreground/70 max-w-2xl mx-auto animate-fade-up delay-100">
            Have questions about our programs or admissions? Our team is here to help you navigate your career journey.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-[2rem] border border-border shadow-soft hover:shadow-elevated transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{info.title}</h3>
                <div className="space-y-1 mb-4">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-foreground font-medium">{detail}</p>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm uppercase tracking-wider font-bold">{info.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div className="bg-card p-8 md:p-12 rounded-[2.5rem] border border-border shadow-soft animate-fade-up">
              <div className="mb-8">
                <h2 className="text-3xl font-display font-bold mb-4">Send us a Message</h2>
                <p className="text-muted-foreground">Fill out the form below and we'll respond within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold pl-1">Full Name</label>
                    <Input placeholder="John Doe" required className="rounded-xl h-12 bg-secondary/50 border-transparent focus:bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold pl-1">Email Address</label>
                    <Input type="email" placeholder="john@example.com" required className="rounded-xl h-12 bg-secondary/50 border-transparent focus:bg-background" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold pl-1">Subject</label>
                  <Input placeholder="Course Inquiry" required className="rounded-xl h-12 bg-secondary/50 border-transparent focus:bg-background" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold pl-1">Your Message</label>
                  <Textarea
                    placeholder="How can we help you?"
                    required
                    className="rounded-xl min-h-[150px] bg-secondary/50 border-transparent focus:bg-background resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="xl"
                  className="w-full rounded-xl shadow-glow-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Google Map */}
            <div className="h-full min-h-[500px] rounded-[2.5rem] overflow-hidden border border-border shadow-elevated relative animate-fade-up delay-200 group">
              <iframe
                src="https://maps.google.com/maps?q=11.068538,77.081520&hl=en&z=14&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0%) contrast(1.1)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>

              {/* Overlay Overlay for style (optional, removed for better usability) */}

              {/* Location Pin Card Floating */}
              <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 bg-background/90 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/20 animate-fade-in delay-500">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary fill-primary/20 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">We are here!</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Near Sri Chaitanya Techno School, Avinashi Road, Neelambur, Coimbatore - 641062
                    </p>
                    <a
                      href="https://www.google.com/maps?q=11.068538,77.081520"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary mt-3 hover:underline"
                    >
                      Get Directions <Globe className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="bg-foreground text-primary-foreground rounded-[2.5rem] p-12 flex flex-wrap justify-center gap-12 text-center md:text-left">
            <div className="flex items-center gap-4">
              <MessageSquare className="w-10 h-10 text-accent" />
              <div>
                <p className="font-bold text-xl">Quick Response</p>
                <p className="text-primary-foreground/60">Within 24 working hours</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="w-10 h-10 text-accent" />
              <div>
                <p className="font-bold text-xl">Operational Hours</p>
                <p className="text-primary-foreground/60">Mon-Sat: 9AM - 6PM</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Globe className="w-10 h-10 text-accent" />
              <div>
                <p className="font-bold text-xl">PAN India Support</p>
                <p className="text-primary-foreground/60">Online & Call assistance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
