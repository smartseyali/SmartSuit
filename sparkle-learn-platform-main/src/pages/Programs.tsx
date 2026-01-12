import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, ArrowRight, Search, Filter, X } from 'lucide-react';
import { usePrograms, useCategories } from '@/hooks/usePrograms';

const modes = ['All', 'Online', 'Offline', 'Hybrid'];

const Programs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedMode, setSelectedMode] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { data: programs, isLoading, error } = usePrograms();
  const { data: categories = [] } = useCategories();

  const filteredPrograms = useMemo(() => {
    if (!programs) return [];
    
    return programs.filter((program) => {
      const matchesCategory = selectedCategory === 'All' || program.category === selectedCategory;
      const matchesMode = selectedMode === 'All' || program.mode === selectedMode;
      const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesMode && matchesSearch;
    });
  }, [programs, selectedCategory, selectedMode, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
         <section className="pt-32 pb-16 text-center">
             <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
             </div>
             <p className="mt-4 text-muted-foreground">Loading programs...</p>
         </section>
        <Footer />
      </main>
    );
  }

  if (error) {
     return (
      <main className="min-h-screen bg-background">
        <Navbar />
         <section className="pt-32 pb-16 text-center">
             <h3 className="text-xl font-bold text-destructive">Error loading programs</h3>
             <p className="mt-2 text-muted-foreground">{(error as Error).message}</p>
         </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6 animate-fade-up">
              Explore Our Programs
            </h1>
            <p className="text-xl text-primary-foreground/80 animate-fade-up delay-100">
              Industry-aligned programs designed to accelerate your career. Find the perfect fit for your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-card border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Category Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-muted-foreground">Category:</span>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleCategoryChange('All')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === 'All'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Mode:</span>
                <div className="flex gap-2">
                  {modes.map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setSelectedMode(mode)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedMode === mode
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {(selectedCategory !== 'All' || selectedMode !== 'All') && (
                <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {(selectedCategory !== 'All' ? 1 : 0) + (selectedMode !== 'All' ? 1 : 0)}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Filters Dropdown */}
          {showFilters && (
            <div className="lg:hidden mt-4 p-4 bg-secondary rounded-xl animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Filters</span>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-muted-foreground block mb-2">Category</span>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleCategoryChange('All')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === 'All'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card text-card-foreground'
                      }`}
                    >
                      All
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          selectedCategory === category
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card text-card-foreground'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-muted-foreground block mb-2">Mode</span>
                  <div className="flex gap-2 flex-wrap">
                    {modes.map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setSelectedMode(mode)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          selectedMode === mode
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card text-card-foreground'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredPrograms.length}</span> programs
            </p>
          </div>

          {filteredPrograms.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program, index) => (
                <Link
                  key={program.id}
                  to={`/programs/${program.id}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 border border-border/50 animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                        {program.category}
                      </span>
                      {program.featured && (
                        <span className="inline-block bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display font-bold text-foreground text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {program.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {program.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{program.mode}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-primary font-bold text-lg">{program.fees}</span>
                      <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2">No programs found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedMode('All');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Programs;
