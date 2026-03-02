import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/data/blog';
import { Calendar, User, ArrowLeft, ArrowRight, Clock, Tags, Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
import SEO from '@/components/common/SEO';

const BlogPost = () => {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === id);

    if (!post) {
        return (
            <main className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-32 pb-20 text-center animate-fade-in">
                    <h1 className="text-3xl font-display font-bold text-foreground mb-4 font-black">Post Not Found</h1>
                    <p className="text-muted-foreground mb-8 text-lg">The story you're looking for doesn't exist.</p>
                    <Button asChild className="rounded-2xl px-8 h-12 shadow-glow-primary">
                        <Link to="/blog">Browse All Stories</Link>
                    </Button>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <SEO
                title={`${post.title} | Sparkle Insights`}
                description={post.excerpt}
            />
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-hero-gradient relative">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-80 h-80 bg-accent rounded-full blur-3xl animate-float" />
                </div>
                <div className="container mx-auto px-4 relative max-w-4xl text-center">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center justify-center gap-2 text-sm text-primary-foreground/60 mb-8 animate-fade-up">
                        <Link to="/" className="hover:text-primary-foreground transition-all">Home</Link>
                        <span>/</span>
                        <Link to="/blog" className="hover:text-primary-foreground transition-all">Insights</Link>
                        <span>/</span>
                        <span className="text-primary-foreground font-medium truncate max-w-[200px]">{post.category}</span>
                    </nav>

                    <h1 className="text-4xl md:text-5xl font-display font-black text-primary-foreground mb-8 animate-fade-up">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-primary-foreground/80 animate-fade-up delay-100">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                <User className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-bold">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{post.readTime}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Featured Image */}
                    <div className="relative -mt-32 mb-16 rounded-[2.5rem] overflow-hidden shadow-elevated border border-border/50 animate-fade-up delay-200 aspect-video lg:aspect-[21/9]">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-16 relative">
                        {/* Fixed Social Sidebar (Desktop Only) */}
                        <div className="hidden lg:block w-16">
                            <div className="sticky top-32 flex flex-col items-center gap-6 animate-fade-up delay-400">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground vertical-lr transform rotate-180">Share This Story</span>
                                <div className="h-12 w-[1px] bg-border/50" />
                                <button className="hover:text-primary text-muted-foreground transition-all hover:scale-125"><Facebook className="w-5 h-5" /></button>
                                <button className="hover:text-primary text-muted-foreground transition-all hover:scale-125"><Twitter className="w-5 h-5" /></button>
                                <button className="hover:text-primary text-muted-foreground transition-all hover:scale-125"><Linkedin className="w-5 h-5" /></button>
                                <button className="hover:text-primary text-muted-foreground transition-all hover:scale-125"><Share2 className="w-5 h-5" /></button>
                            </div>
                        </div>

                        {/* Article */}
                        <div className="flex-grow animate-fade-up delay-300">
                            <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-p:text-muted-foreground prose-a:text-primary prose-blockquote:border-primary prose-blockquote:bg-secondary/30 prose-blockquote:p-6 prose-blockquote:rounded-2xl">
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </article>

                            {/* Tags & Footer */}
                            <div className="mt-16 pt-10 border-t border-border/50 space-y-8">
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-2 text-foreground font-black text-sm">
                                        <Tags className="w-4 h-4 text-primary" />
                                        TAGS
                                    </div>
                                    {post.tags.map(tag => (
                                        <span key={tag} className="px-5 py-2 rounded-full bg-secondary/50 text-foreground text-xs font-bold hover:bg-primary hover:text-white transition-all cursor-pointer">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Author Bio (Mock) */}
                                <div className="bg-gradient-to-br from-card to-secondary/30 p-10 rounded-3xl border border-border/50 shadow-soft flex items-center gap-8">
                                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary border-4 border-background shadow-lg">
                                        <User className="w-10 h-10" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-xl font-display font-black text-foreground">Written by {post.author}</h4>
                                        <p className="text-muted-foreground">Lead educator at Sparkle with over 15 years of clinical experience. Passionate about shaping the next generation of healthcare professionals.</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Related */}
                            <div className="mt-20 p-12 bg-primary rounded-[2.5rem] relative overflow-hidden text-center group">
                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                                <h3 className="text-3xl font-display font-black text-primary-foreground mb-6">Ready to find your course?</h3>
                                <p className="text-primary-foreground/80 mb-10 max-w-md mx-auto">Explore clinical and management programs designed to get you hired.</p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button variant="hero" size="xl" asChild className="rounded-2xl shadow-glow-accent">
                                        <Link to="/programs">View All Programs</Link>
                                    </Button>
                                    <Button variant="heroOutline" size="xl" asChild className="rounded-2xl">
                                        <Link to="/apply">Get Free Counselling</Link>
                                    </Button>
                                </div>
                            </div>

                            {/* Prev/Next Navigation (Mock) */}
                            <div className="mt-20 flex justify-between gap-6 overflow-hidden">
                                <button className="text-left group flex items-start gap-4 p-8 bg-card rounded-3xl border border-border hover:border-primary transition-all flex-grow basis-0">
                                    <ArrowLeft className="w-5 h-5 text-primary group-hover:-translate-x-2 transition-transform" />
                                    <div>
                                        <p className="text-xs font-black text-muted-foreground mb-1 uppercase tracking-widest">Previous Story</p>
                                        <h5 className="font-bold text-foreground line-clamp-1">Industrial Growth in Coimbatore</h5>
                                    </div>
                                </button>
                                <button className="text-right group flex flex-row-reverse items-start gap-4 p-8 bg-card rounded-3xl border border-border hover:border-primary transition-all flex-grow basis-0">
                                    <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform" />
                                    <div>
                                        <p className="text-xs font-black text-muted-foreground mb-1 uppercase tracking-widest">Next Story</p>
                                        <h5 className="font-bold text-foreground line-clamp-1">Lab Automation 2024</h5>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default BlogPost;
