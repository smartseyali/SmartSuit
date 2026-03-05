import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/data/blog';
import { Calendar, User, ArrowRight, BookOpen, Clock } from 'lucide-react';
import SEO from '@/components/common/SEO';

const Blog = () => {
    return (
        <main className="min-h-screen bg-background">
            <SEO
                title="Sparkle Insights | Allied Health Science Careers & Guide"
                description="Stay updated with Sparkle Insights. Professional guides on Allied Health Science careers, salaries, job roles, and future opportunities in India."
            />
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-hero-gradient relative">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 right-20 w-80 h-80 bg-accent rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 text-center relative">
                    <h1 className="text-4xl md:text-6xl font-display font-black text-primary-foreground mb-6 animate-fade-up">
                        Sparkle <span className="text-accent underline decoration-accent/30 underline-offset-8 italic">Insights</span>
                    </h1>
                    <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-up delay-100">
                        Expert opinions, industry trends, and student success stories from the world of Healthcare and Management.
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-20 -mt-10">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <Link
                                key={post.id}
                                to={`/blog/${post.id}`}
                                className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 border border-border/50 animate-fade-up flex flex-col h-full"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        title={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-primary/90 backdrop-blur-md text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            {post.readTime}
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-display font-bold text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                                        {post.title}
                                    </h2>

                                    <p className="text-muted-foreground mb-8 line-clamp-3 text-sm flex-grow">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-border/50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <span className="text-xs font-bold text-foreground">{post.author}</span>
                                        </div>
                                        <span className="text-sm text-primary font-bold flex items-center gap-1 transform group-hover:translate-x-1 transition-transform">
                                            Read More <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination/Load More Mock */}
                    <div className="text-center mt-16">
                        <Button variant="outline" size="lg" className="rounded-2xl px-12 h-14 font-bold border-2 hover:bg-primary hover:text-primary-foreground transition-all">
                            Load More <BookOpen className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-secondary/30 border-y border-border/50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-card rounded-[3rem] p-10 md:p-16 border border-border/50 shadow-soft relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-grow space-y-4">
                            <h2 className="text-3xl font-display font-bold text-foreground">Subscribe to Insights</h2>
                            <p className="text-muted-foreground max-w-sm">Stay updated with the latest trends in healthcare education and career opportunities.</p>
                        </div>
                        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="h-14 px-6 rounded-2xl bg-background border border-border focus:border-primary outline-none min-w-[280px]"
                            />
                            <Button size="xl" className="rounded-2xl px-8 shadow-glow-primary">Subscribe</Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default Blog;
