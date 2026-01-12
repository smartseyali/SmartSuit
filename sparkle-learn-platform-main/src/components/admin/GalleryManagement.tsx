import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, Image, Video, X } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  media_url: string;
  media_type: string;
  is_featured: boolean | null;
  is_active: boolean | null;
  display_order: number | null;
  created_at: string;
}

interface GalleryManagementProps {
  isAdmin: boolean;
}

const GalleryManagement = ({ isAdmin }: GalleryManagementProps) => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    media_url: '',
    media_type: 'image',
    is_featured: false,
    is_active: true,
    display_order: 0,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    // Mock fetch
    setTimeout(() => {
        setItems([]);
        setLoading(false);
    }, 500);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      media_url: '',
      media_type: 'image',
      is_featured: false,
      is_active: true,
      display_order: 0,
    });
    setEditingItem(null);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      media_url: item.media_url,
      media_type: item.media_type,
      is_featured: item.is_featured || false,
      is_active: item.is_active ?? true,
      display_order: item.display_order || 0,
    });
    setIsDialogOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    if (!isVideo && !isImage) {
      toast.error('Please upload an image or video file');
      return;
    }

    setUploading(true);
    // Mock upload
    setTimeout(() => {
        setFormData({
            ...formData,
            media_url: URL.createObjectURL(file),
            media_type: isVideo ? 'video' : 'image',
        });
        setUploading(false);
        toast.success('File uploaded successfully (Mock)');
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.media_url) {
      toast.error('Please fill in required fields');
      return;
    }

    toast.success(editingItem ? 'Gallery item updated (Mock)' : 'Gallery item created (Mock)');
    setIsDialogOpen(false);
    resetForm();
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    toast.success('Item deleted (Mock)');
    fetchItems();
  };

  const toggleActive = async (item: GalleryItem) => {
    toast.success(`Item ${item.is_active ? 'hidden' : 'published'} (Mock)`);
    fetchItems();
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gallery Management</CardTitle>
        {isAdmin && (
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Media
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Edit Gallery Item' : 'Add New Media'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Media title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Media File *</Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {uploading ? 'Uploading...' : 'Upload File'}
                    </Button>
                    {formData.media_url && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {formData.media_type === 'video' ? <Video className="w-3 h-3" /> : <Image className="w-3 h-3" />}
                        File uploaded
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, media_url: '', media_type: 'image' })}
                          className="ml-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                  </div>
                  {formData.media_url && formData.media_type === 'image' && (
                    <img src={formData.media_url} alt="Preview" className="w-full h-32 object-cover rounded-lg mt-2" />
                  )}
                  {formData.media_url && formData.media_type === 'video' && (
                    <video src={formData.media_url} className="w-full h-32 object-cover rounded-lg mt-2" controls />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_featured"
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                    />
                    <Label htmlFor="is_featured">Featured</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={uploading}>
                    {editingItem ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No gallery items yet. Add your first media to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item.id} className="relative group rounded-lg overflow-hidden border border-border">
                {item.media_type === 'video' ? (
                  <video src={item.media_url} className="w-full h-32 object-cover" />
                ) : (
                  <img src={item.media_url} alt={item.title} className="w-full h-32 object-cover" />
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {isAdmin && (
                    <>
                      <Button size="sm" variant="ghost" onClick={() => toggleActive(item)} className="text-white hover:bg-white/20">
                        {item.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(item)} className="text-white hover:bg-white/20">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(item.id)} className="text-white hover:bg-white/20">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant={item.media_type === 'video' ? 'secondary' : 'outline'} className="text-xs">
                      {item.media_type === 'video' ? <Video className="w-3 h-3 mr-1" /> : <Image className="w-3 h-3 mr-1" />}
                      {item.media_type}
                    </Badge>
                    {item.is_featured && <Badge variant="default" className="text-xs">Featured</Badge>}
                    {!item.is_active && <Badge variant="outline" className="text-xs">Hidden</Badge>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GalleryManagement;
