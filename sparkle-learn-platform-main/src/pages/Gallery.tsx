import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Image, Video, X } from 'lucide-react';
import { fetchGallery, GalleryItem } from '@/lib/api';

const Gallery = () => {
    // Map GalleryItem from api (camelCase) to component usage if needed, OR update component to use camelCase
    // Let's update component to use camelCase to match API.
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

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.mediaType === filter;
  });

  const featuredItems = items.filter(item => item.isFeatured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Our Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore moments from our campus, events, and student life through our collection of images and videos.
            </p>
          </div>
        </section>

        {/* Featured Section */}
        {featuredItems.length > 0 && (
          <section className="py-12 container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((item) => (
                <div
                  key={item.id}
                  className="relative group rounded-xl overflow-hidden cursor-pointer shadow-soft hover:shadow-elevated transition-all duration-300"
                  onClick={() => setSelectedItem(item)}
                >
                  {item.mediaType === 'video' ? (
                    <video src={item.mediaUrl} className="w-full h-64 object-cover" />
                  ) : (
                    <img src={item.mediaUrl} alt={item.title} className="w-full h-64 object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold">{item.title}</h3>
                      {item.description && (
                        <p className="text-white/80 text-sm mt-1 line-clamp-2">{item.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    {item.mediaType === 'video' ? (
                      <span className="bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <Video className="w-3 h-3" /> Video
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery Grid */}
        <section className="py-12 container mx-auto px-4">
          <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as 'all' | 'image' | 'video')}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">All Media</h2>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="image" className="flex items-center gap-1">
                  <Image className="w-4 h-4" /> Images
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-1">
                  <Video className="w-4 h-4" /> Videos
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <GalleryGrid items={filteredItems} onSelect={setSelectedItem} loading={loading} />
            </TabsContent>
            <TabsContent value="image" className="mt-0">
              <GalleryGrid items={filteredItems} onSelect={setSelectedItem} loading={loading} />
            </TabsContent>
            <TabsContent value="video" className="mt-0">
              <GalleryGrid items={filteredItems} onSelect={setSelectedItem} loading={loading} />
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {selectedItem && (
            <div className="relative">
              {selectedItem.mediaType === 'video' ? (
                <video
                  src={selectedItem.mediaUrl}
                  className="w-full max-h-[80vh] object-contain"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={selectedItem.mediaUrl}
                  alt={selectedItem.title}
                  className="w-full max-h-[80vh] object-contain"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-white text-xl font-semibold">{selectedItem.title}</h3>
                {selectedItem.description && (
                  <p className="text-white/80 mt-2">{selectedItem.description}</p>
                )}
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-square rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p>No media items found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative group aspect-square rounded-lg overflow-hidden cursor-pointer bg-muted"
          onClick={() => onSelect(item)}
        >
          {item.mediaType === 'video' ? (
            <video src={item.mediaUrl} className="w-full h-full object-cover" />
          ) : (
            <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white font-medium text-center px-2">{item.title}</span>
          </div>
          {item.mediaType === 'video' && (
            <div className="absolute top-2 right-2">
              <span className="bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                <Video className="w-3 h-3" />
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Gallery;
