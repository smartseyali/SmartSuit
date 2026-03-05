import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blog';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

const RecentBlog = () => {
    const recentPosts = blogPosts.slice(0, 3);

    return (
        <section className="py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">Knowledge Hub</span>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-foreground leading-tight">
                            Latest From <span className="text-primary italic">Sparkle Insights</span>
                        </h2>
                    </div>
                    <Button variant="outline" asChild className="rounded-2xl border-2 hover:bg-primary hover:text-primary-foreground transition-all">
                        <Link to="/blog">View All Stories</Link>
                    </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {recentPosts.map((post, index) => (
                        <Link
                            key={post.id}
                            to={`/blog/${post.id}`}
                            className="group bg-card rounded-[2.5rem] overflow-hidden border border-border/50 hover:shadow-elevated transition-all duration-500 animate-fade-up flex flex-col"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    title={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-md text-foreground text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3 text-primary" />
                                        {post.date}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-3 h-3 text-primary" />
                                        {post.readTime}
                                    </span>
                                </div>
                                <h3 className="text-xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-grow">
                                    {post.excerpt}
                                </p>
                                <span className="inline-flex items-center gap-2 text-sm font-black text-primary group-hover:gap-3 transition-all">
                                    Continue Reading <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentBlog;
