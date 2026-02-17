import { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Image, Video, X } from 'lucide-react';
import { fetchGallery, GalleryItem } from '@/lib/api';

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await fetchGallery();
        setItems(data);
      } catch (err) {
        console.error("Failed to load gallery", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (filter === 'all') return true;
      return item.mediaType === filter;
    });
  }, [items, filter]);

  const featuredItems = useMemo(() => items.filter(item => item.isFeatured), [items]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-hero-gradient relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl animate-float" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-float delay-300" />
          </div>
          <div className="container mx-auto px-4 relative text-center">
            <h1 className="text-4xl md:text-6xl font-display font-black text-primary-foreground mb-6 animate-fade-up">
              Visual <span className="text-accent underline decoration-accent/30 underline-offset-8">Chronicles</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-up delay-100">
              Immerse yourself in the vibrant life of Sparkle. From campus breakthroughs to student celebrations.
            </p>
          </div>
        </section>

        {/* Featured Section */}
        {featuredItems.length > 0 && (
          <section className="py-20 container mx-auto px-4">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-display font-bold text-foreground">Featured Highlights</h2>
              <div className="h-1 flex-grow bg-gradient-to-r from-accent/50 to-transparent rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative group rounded-3xl overflow-hidden cursor-pointer shadow-card hover:shadow-elevated transition-all duration-500 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    {item.mediaType === 'video' ? (
                      <video src={item.mediaUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                        Featured
                      </span>
                      {item.mediaType === 'video' && (
                        <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/10 flex items-center gap-1">
                          <Video className="w-3 h-3" /> Video
                        </span>
                      )}
                    </div>
                    <h3 className="text-white text-2xl font-display font-bold mb-2">{item.title}</h3>
                    {item.description && (
                      <p className="text-white/70 text-sm line-clamp-2 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery Grid Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as 'all' | 'image' | 'video')} className="w-full">
              <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                <div>
                  <h2 className="text-3xl font-display font-bold text-foreground">Media Collection</h2>
                  <p className="text-muted-foreground mt-2">Browse through our complete library of assets</p>
                </div>
                <TabsList className="bg-background/50 backdrop-blur-md border border-border/50 p-1.5 rounded-2xl h-auto">
                  <TabsTrigger value="all" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="image" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 gap-2">
                    <Image className="w-4 h-4" /> Images
                  </TabsTrigger>
                  <TabsTrigger value="video" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 gap-2">
                    <Video className="w-4 h-4" /> Videos
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="min-h-[400px]">
                <GalleryGrid items={filteredItems} onSelect={setSelectedItem} loading={loading} />
              </div>
            </Tabs>
          </div>
        </section>
      </main>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-6xl p-0 overflow-hidden bg-black/95 border-none shadow-2xl rounded-none md:rounded-3xl">
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-6 right-6 z-50 text-white bg-white/10 backdrop-blur-xl rounded-full p-3 hover:bg-white/20 transition-all border border-white/10"
          >
            <X className="w-6 h-6" />
          </button>
          {selectedItem && (
            <div className="grid grid-cols-1 lg:grid-cols-4 h-full max-h-[90vh]">
              <div className="lg:col-span-3 flex items-center justify-center bg-black p-4">
                {selectedItem.mediaType === 'video' ? (
                  <video
                    src={selectedItem.mediaUrl}
                    className="w-full max-h-[80vh] object-contain rounded-xl"
                    controls
                    autoPlay
                  />
                ) : (
                  <img
                    src={selectedItem.mediaUrl}
                    alt={selectedItem.title}
                    className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                  />
                )}
              </div>
              <div className="p-8 flex flex-col justify-center bg-gradient-to-br from-zinc-900 to-black text-white">
                <div className="space-y-6">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${selectedItem.isFeatured ? 'bg-accent/20 border-accent text-accent' : 'bg-white/10 border-white/20 text-white/60'}`}>
                      {selectedItem.isFeatured ? 'Featured Spotlight' : selectedItem.mediaType}
                    </span>
                    <h3 className="text-3xl font-display font-bold mt-4 leading-tight">{selectedItem.title}</h3>
                  </div>
                  {selectedItem.description && (
                    <p className="text-white/60 leading-relaxed text-lg">{selectedItem.description}</p>
                  )}
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-white/40 text-xs italic">
                      Part of Sparkle's visual journey collection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

interface GalleryGridProps {
  items: GalleryItem[];
  onSelect: (item: GalleryItem) => void;
  loading: boolean;
}

const GalleryGrid = ({ items, onSelect, loading }: GalleryGridProps) => {
  if (loading) {
    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="break-inside-avoid rounded-3xl bg-muted animate-pulse h-64 shadow-sm border border-border" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-32 rounded-3xl border-2 border-dashed border-border">
        <div className="bg-secondary p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-muted-foreground/50">
          <Image className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-display font-bold text-foreground">No media moments found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your filter settings</p>
      </div>
    );
  }

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="relative group break-inside-avoid rounded-2xl overflow-hidden cursor-pointer bg-card border border-border/50 shadow-sm hover:shadow-elevated transition-all duration-500 animate-fade-up"
          style={{ animationDelay: `${index * 50}ms` }}
          onClick={() => onSelect(item)}
        >
          {item.mediaType === 'video' ? (
            <div className="relative">
              <video src={item.mediaUrl} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md rounded-full p-1.5 border border-white/10">
                <Video className="w-3 h-3 text-white" />
              </div>
            </div>
          ) : (
            <img src={item.mediaUrl} alt={item.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
            <h4 className="text-white font-display font-bold text-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h4>
            <div className="h-0.5 w-0 group-hover:w-8 bg-accent mt-2 transition-all duration-500" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
