import SEO from '@/components/common/SEO';
import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Clock, MapPin, ArrowRight, Search, Filter, X,
  ChevronDown, LayoutGrid, ListFilter, SlidersHorizontal, Award
} from 'lucide-react';
import { usePrograms, useCategories } from '@/hooks/usePrograms';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

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
      <SEO
        title="Our Programs"
        description="Explore our industry-aligned programs designed to accelerate your career. Find the perfect fit for your goals."
      />
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
      <section className="py-6 bg-background/80 backdrop-blur-md sticky top-20 z-40 border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            {/* Search & Main Actions */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
              {/* Modern Search Input */}
              <div className="relative flex-grow group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="What do you want to learn today?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-xl bg-secondary/50 border-transparent focus:bg-background focus:border-primary/20 shadow-none focus:shadow-glow-primary transition-all text-base"
                />
              </div>

              <div className="flex gap-3 items-center">
                {/* Desktop Selects */}
                <div className="hidden lg:flex items-center gap-3">
                  <Select value={selectedMode} onValueChange={setSelectedMode}>
                    <SelectTrigger className="w-[180px] h-12 rounded-xl border-transparent bg-secondary/50 focus:bg-background text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <ListFilter className="w-4 h-4 text-muted-foreground" />
                        <span>Mode: <SelectValue placeholder="All" /></span>
                      </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-border/50">
                      {modes.map(mode => (
                        <SelectItem key={mode} value={mode} className="rounded-lg py-2">
                          {mode}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Mobile & Tablet Filter Drawer */}
                <Sheet open={showFilters} onOpenChange={setShowFilters}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="lg:hidden h-12 rounded-xl px-4 border-transparent bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <SlidersHorizontal className="w-5 h-5 mr-2" />
                      Filters
                      {(selectedCategory !== 'All' || selectedMode !== 'All') && (
                        <span className="ml-2 px-2 py-0.5 min-w-[1.25rem] h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                          {(selectedCategory !== 'All' ? 1 : 0) + (selectedMode !== 'All' ? 1 : 0)}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="flex flex-col h-full w-[300px] sm:w-[400px]">
                    <SheetHeader className="text-left pb-6 border-b">
                      <SheetTitle className="text-2xl font-display font-bold">Filters</SheetTitle>
                      <SheetDescription>Refine the program list to find exactly what you need.</SheetDescription>
                    </SheetHeader>

                    <div className="flex-grow overflow-y-auto py-6 space-y-8">
                      {/* Search in Drawer (Optional, but useful on mobile) */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Search</h4>
                        <div className="relative group">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="Search programs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-10 rounded-lg bg-secondary/50 border-transparent"
                          />
                        </div>
                      </div>

                      {/* Mode in Drawer */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Delivery Mode</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {modes.map(mode => (
                            <button
                              key={mode}
                              onClick={() => setSelectedMode(mode)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${selectedMode === mode
                                ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                                : 'bg-secondary/50 border-transparent text-foreground hover:border-primary/30'
                                }`}
                            >
                              {mode}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Categories in Drawer */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleCategoryChange('All')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${selectedCategory === 'All'
                              ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                              : 'bg-secondary/50 border-transparent text-foreground hover:border-primary/30'
                              }`}
                          >
                            All Categories
                          </button>
                          {categories.map((category) => (
                            <button
                              key={category}
                              onClick={() => handleCategoryChange(category)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${selectedCategory === category
                                ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                                : 'bg-secondary/50 border-transparent text-foreground hover:border-primary/30'
                                }`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <SheetFooter className="pt-6 border-t mt-auto">
                      <div className="flex items-center justify-between w-full gap-4">
                        <button
                          onClick={() => {
                            setSelectedCategory('All');
                            setSelectedMode('All');
                            setSearchQuery('');
                          }}
                          className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors px-4 py-2"
                        >
                          Clear All
                        </button>
                        <SheetClose asChild>
                          <Button className="flex-grow rounded-xl h-11 font-bold">Apply Filters</Button>
                        </SheetClose>
                      </div>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Desktop Categories (Horizontal Scroll) */}
            <div className="hidden lg:flex items-center gap-4">
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 whitespace-nowrap">Categories:</span>
              <div className="flex gap-2 pb-1 overflow-x-auto no-scrollbar scroll-smooth">
                <button
                  onClick={() => handleCategoryChange('All')}
                  className={`shrink-0 px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 border ${selectedCategory === 'All'
                    ? 'bg-primary border-primary text-primary-foreground shadow-glow-primary'
                    : 'bg-secondary/50 border-transparent text-foreground hover:border-primary/30'
                    }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`shrink-0 px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 border ${selectedCategory === category
                      ? 'bg-primary border-primary text-primary-foreground shadow-glow-primary'
                      : 'bg-secondary/50 border-transparent text-foreground hover:border-primary/30'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {(selectedCategory !== 'All' || selectedMode !== 'All' || searchQuery !== '') && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedMode('All');
                    setSearchQuery('');
                  }}
                  className="ml-auto text-sm font-bold text-primary hover:text-primary/80 flex items-center gap-1.5 transition-colors"
                >
                  <X className="w-4 h-4" /> Reset
                </button>
              )}
            </div>

            {/* Filter Tags for Tablet/Desktop */}
            {(selectedCategory !== 'All' || selectedMode !== 'All') && (
              <div className="flex items-center gap-3 pt-2 lg:hidden">
                <div className="flex flex-wrap gap-2">
                  {selectedCategory !== 'All' && (
                    <div className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center gap-1.5 text-xs font-semibold">
                      {selectedCategory}
                      <X className="w-3 h-3 cursor-pointer hover:text-foreground transition-colors" onClick={() => handleCategoryChange('All')} />
                    </div>
                  )}
                  {selectedMode !== 'All' && (
                    <div className="px-3 py-1.5 rounded-lg bg-accent/10 text-accent-foreground border border-accent/20 flex items-center gap-1.5 text-xs font-semibold">
                      {selectedMode}
                      <X className="w-3 h-3 cursor-pointer hover:text-foreground transition-colors" onClick={() => setSelectedMode('All')} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
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
                  {/* Certification Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-primary text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-primary/10">
                      <Award className="w-3 h-3" />
                      Bharathiyar Univ. Certified
                    </span>
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
