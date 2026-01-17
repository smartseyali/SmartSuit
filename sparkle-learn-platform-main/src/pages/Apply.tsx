import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  ArrowRight, Phone, Mail, MapPin, CheckCircle2,
  User, AtSign, MessageSquare, GraduationCap
} from 'lucide-react';
import { fetchPrograms, createEnquiry } from '@/lib/api';

interface Course {
  id: string;
  title: string;
  slug: string;
}

const Apply = () => {
  const [searchParams] = useSearchParams();
  const programSlug = searchParams.get('program');

  // Use generic Course interface but map from ApiProductList
  const [courses, setCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course_id: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const products = await fetchPrograms();
        const mappedCourses = products.map(p => ({
          id: p.id,
          title: p.name,
          slug: p.slug
        }));
        setCourses(mappedCourses);

        if (programSlug) {
          const matchingCourse = mappedCourses.find(c => c.slug === programSlug);
          if (matchingCourse) {
            setFormData(prev => ({ ...prev, course_id: matchingCourse.id }));
          }
        }
      } catch (err) {
        console.error("Failed to load courses", err);
      }
    };
    loadCourses();
  }, [programSlug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    const selectedCourse = courses.find(c => c.id === formData.course_id);

    try {
      await createEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        courseId: formData.course_id || undefined,
        courseName: selectedCourse?.title,
        message: formData.message
      });
      setIsSubmitted(true);
      toast.success('Enquiry submitted successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 animate-fade-up">
              Start Your Learning Journey
            </h1>
            <p className="text-xl text-primary-foreground/80 animate-fade-up delay-100">
              Take the first step towards your dream career. Fill in your details and our career counsellor will reach out to you.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Form */}
            <div className="animate-fade-up">
              {!isSubmitted ? (
                <div className="bg-card rounded-2xl shadow-elevated border border-border/50 p-8">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                    Enquiry Form
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Fill in your details and we'll get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Enter your email"
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                    </div>

                    {/* Program */}
                    <div>
                      <label htmlFor="course_id" className="block text-sm font-medium text-foreground mb-2">
                        Interested Program
                      </label>
                      <div className="relative">
                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <select
                          id="course_id"
                          name="course_id"
                          value={formData.course_id}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                        >
                          <option value="">Select a program (optional)</option>
                          {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                              {course.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message (Optional)
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Any specific questions or requirements?"
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="default"
                      size="xl"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Enquiry
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="bg-card rounded-2xl shadow-elevated border border-border/50 p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                    Thank You!
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Your enquiry has been submitted successfully. Our career counsellor will contact you within 24 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="default" asChild>
                      <Link to="/programs">Explore Programs</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/">Back to Home</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="animate-fade-up delay-100">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                    Get in Touch
                  </h2>
                  <p className="text-muted-foreground">
                    Have questions? Our team is here to help you make the right choice.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                      <p className="text-muted-foreground text-sm mb-2">Mon-Sat 9am to 8pm</p>
                      <a href="tel:+918220928732" className="text-primary font-medium hover:underline">
                        +91 82209 28732
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                      <p className="text-muted-foreground text-sm mb-2">We'll respond within 24 hours</p>
                      <a href="mailto:hello@sparkle.edu" className="text-primary font-medium hover:underline">
                        hello@sparkle.edu
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Visit Us</h3>
                      <p className="text-muted-foreground text-sm">
                        Kathir College Campus, Avinashi Road,<br />
                        Neelambur, Coimbatore - 641062
                      </p>
                    </div>
                  </div>
                </div>

                {/* Why Choose */}
                <div className="bg-secondary/50 rounded-2xl p-6 border border-border/50">
                  <h3 className="font-display font-semibold text-foreground mb-4">
                    Why Students Choose Sparkle
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-foreground">92% placement rate</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-foreground">45% average salary hike</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-foreground">300+ hiring partners</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-foreground">Flexible EMI options</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Apply;
