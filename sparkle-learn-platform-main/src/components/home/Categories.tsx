import { Link } from 'react-router-dom';
import { usePrograms, useCategories } from '@/hooks/usePrograms';
import { Database, TrendingUp, Code, Palette, Megaphone, ArrowRight } from 'lucide-react';

const categoryIcons: Record<string, typeof Database> = {
  'Data Science & AI': Database,
  'Business & Management': TrendingUp,
  'Technology': Code,
  'Design': Palette,
  'Marketing': Megaphone,
};

const categoryColors: Record<string, string> = {
  'Data Science & AI': 'bg-blue-500/10 text-blue-600 group-hover:bg-blue-500',
  'Business & Management': 'bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500',
  'Technology': 'bg-purple-500/10 text-purple-600 group-hover:bg-purple-500',
  'Design': 'bg-pink-500/10 text-pink-600 group-hover:bg-pink-500',
  'Marketing': 'bg-orange-500/10 text-orange-600 group-hover:bg-orange-500',
};

const Categories = () => {
  const { data: categories = [], isLoading: catsLoading } = useCategories();
  const { data: programs = [], isLoading: progsLoading } = usePrograms();

  if (catsLoading || progsLoading) {
    return <div className="py-20 text-center">Loading categories...</div>;
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Browse Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Explore By Domain
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect program based on your career goals and interests.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category] || Database;
            const colorClass = categoryColors[category]; //|| 'bg-primary/10 text-primary group-hover:bg-primary';
            const programCount = programs.filter((p) => p.category === category).length;

            return (
              <Link
                key={category}
                to={`/programs?category=${encodeURIComponent(category)}`}
                className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-500 border border-border/50 text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl ${colorClass} flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:text-primary-foreground`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {category}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {programCount} Program{programCount !== 1 ? 's' : ''}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
