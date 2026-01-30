import { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Image, Video, X } from 'lucide-react';
import { fetchGallery, GalleryItem } from '@/lib/api';

const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'document'>('all');

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

  const renderMediaPreview = (item: GalleryItem, className = "") => {
     if (item.mediaType === 'video') {
         const ytId = getYouTubeId(item.mediaUrl);
         if (ytId) {
             return <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={item.title} className={className} />;
         }
         return <video src={item.mediaUrl} className={className} muted />;
     }
     if (item.mediaType === 'document') {
         return (
             <div className={`flex flex-col items-center justify-center bg-secondary/20 p-8 ${className}`}>
                 <div className="bg-primary/10 p-4 rounded-2xl mb-4">
                     <Image className="w-12 h-12 text-primary" />
                 </div>
                 <span className="text-foreground font-semibold px-4 text-center truncate w-full">
                     {item.title || 'Document'}
                 </span>
             </div>
         );
     }
     return <img src={item.mediaUrl} alt={item.title} className={className} />;
  };

  const renderLightboxContent = (item: GalleryItem) => {
      if (item.mediaType === 'video') {
          const ytId = getYouTubeId(item.mediaUrl);
          if (ytId) {
              return (
                  <iframe 
                    src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                    className="w-full h-full max-h-[80vh] rounded-xl aspect-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
              );
          }
          return (
              <video
                src={item.mediaUrl}
                className="w-full max-h-[80vh] object-contain rounded-xl"
                controls
                autoPlay
              />
          );
      }
      if (item.mediaType === 'document') {
          return (
              <div className="w-full flex flex-col items-center justify-center p-12 bg-zinc-900/50 rounded-3xl border border-white/5">
                  <div className="bg-primary/20 p-8 rounded-full mb-8">
                      <Image className="w-20 h-20 text-primary" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4 text-center">{item.title}</h3>
                  <p className="text-white/60 mb-8 max-w-md text-center">{item.description || 'Access this document to learn more about our programs and facilities.'}</p>
                  <a 
                    href={item.mediaUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-3"
                  >
                    View Document <X className="w-5 h-5 rotate-45" />
                  </a>
              </div>
          );
      }
      return (
          <img
            src={item.mediaUrl}
            alt={item.title}
            className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
          />
      );
  };

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
                    {renderMediaPreview(item, "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110")}
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
                  <TabsTrigger value="document" className="rounded-xl px-8 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 gap-2">
                    <Image className="w-4 h-4" /> Documents
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="min-h-[400px]">
                <GalleryGrid 
                    items={filteredItems} 
                    onSelect={setSelectedItem} 
                    loading={loading} 
                    getYouTubeId={getYouTubeId}
                />
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
                 {renderLightboxContent(selectedItem)}
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
  getYouTubeId: (url: string) => string | null;
}

const GalleryGrid = ({ items, onSelect, loading, getYouTubeId }: GalleryGridProps) => {
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
      {items.map((item, index) => {
        const ytId = item.mediaType === 'video' ? getYouTubeId(item.mediaUrl) : null;
        return (
            <div
            key={item.id}
            className="relative group break-inside-avoid rounded-2xl overflow-hidden cursor-pointer bg-card border border-border/50 shadow-sm hover:shadow-elevated transition-all duration-500 animate-fade-up"
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => onSelect(item)}
            >
            {item.mediaType === 'video' ? (
                <div className="relative">
                {ytId ? (
                     <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" alt={item.title}/>
                ) : (
                    <video src={item.mediaUrl} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                )}
                
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md rounded-full p-1.5 border border-white/10">
                    <Video className="w-3 h-3 text-white" />
                </div>
                </div>
            ) : item.mediaType === 'document' ? (
                <div className="relative aspect-[3/4] bg-secondary/10 flex flex-col items-center justify-center p-8 group-hover:bg-secondary/20 transition-colors">
                    <div className="bg-primary/10 p-4 rounded-2xl mb-4 transform transition-transform group-hover:scale-110 group-hover:-rotate-3">
                        <Image className="w-12 h-12 text-primary" />
                    </div>
                    <span className="text-foreground text-center font-semibold text-sm line-clamp-2 px-2">
                        {item.title}
                    </span>
                    <div className="absolute top-3 right-3 bg-primary/10 backdrop-blur-md rounded-full px-2 py-0.5 border border-primary/20">
                        <span className="text-[10px] font-bold text-primary uppercase">PDF</span>
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
        );
      })}
    </div>
  );
};

export default Gallery;
