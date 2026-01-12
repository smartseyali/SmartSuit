import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, X, Image } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  slug: string;
  category: string;
  duration: string;
  mode: string;
  fees: string | null;
  description: string | null;
  overview: string | null;
  eligibility: string | null;
  highlights: string[] | null;
  curriculum: any;
  career_outcomes: string[] | null;
  image_url: string | null;
  is_featured: boolean | null;
  is_active: boolean | null;
  created_at: string;
}

interface CourseManagementProps {
  isAdmin: boolean;
}

const CATEGORIES = [
  'Data Science',
  'Business',
  'Technology',
  'Design',
  'Marketing',
  'Finance',
];

const MODES = ['Online', 'Offline', 'Hybrid'];

const CourseManagement = ({ isAdmin }: CourseManagementProps) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    duration: '',
    mode: 'Online',
    fees: '',
    description: '',
    overview: '',
    eligibility: '',
    highlights: '',
    career_outcomes: '',
    image_url: '',
    is_featured: false,
    is_active: true,
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    // Mock fetch
    setTimeout(() => {
        setCourses([]);
        setLoading(false);
    }, 500);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: editingCourse ? formData.slug : generateSlug(title),
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      category: '',
      duration: '',
      mode: 'Online',
      fees: '',
      description: '',
      overview: '',
      eligibility: '',
      highlights: '',
      career_outcomes: '',
      image_url: '',
      is_featured: false,
      is_active: true,
    });
    setEditingCourse(null);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      slug: course.slug,
      category: course.category,
      duration: course.duration,
      mode: course.mode,
      fees: course.fees || '',
      description: course.description || '',
      overview: course.overview || '',
      eligibility: course.eligibility || '',
      highlights: course.highlights?.join('\n') || '',
      career_outcomes: course.career_outcomes?.join('\n') || '',
      image_url: course.image_url || '',
      is_featured: course.is_featured || false,
      is_active: course.is_active ?? true,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.duration) {
      toast.error('Please fill in required fields');
      return;
    }

    toast.success(editingCourse ? 'Course updated successfully (Mock)' : 'Course created successfully (Mock)');
    setIsDialogOpen(false);
    resetForm();
    fetchCourses();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    toast.success('Course deleted successfully (Mock)');
    fetchCourses();
  };

  const toggleActive = async (course: Course) => {
    toast.success(`Course ${course.is_active ? 'hidden' : 'published'} (Mock)`);
    fetchCourses();
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
        <CardTitle>Course Management</CardTitle>
        {isAdmin && (
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingCourse ? 'Edit Course' : 'Add New Course'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g., Data Science Masters"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="data-science-masters"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration *</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g., 12 Months"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mode">Mode</Label>
                    <Select
                      value={formData.mode}
                      onValueChange={(value) => setFormData({ ...formData, mode: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        {MODES.map((mode) => (
                          <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fees">Fees</Label>
                    <Input
                      id="fees"
                      value={formData.fees}
                      onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                      placeholder="e.g., ₹1,50,000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Course Image</Label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        
                        if (!file.type.startsWith('image/')) {
                          toast.error('Please upload an image file');
                          return;
                        }

                        setUploading(true);
                        // Mock upload
                        setTimeout(() => {
                             setFormData({ ...formData, image_url: URL.createObjectURL(file) });
                             setUploading(false);
                             toast.success('Image uploaded (Mock)');
                        }, 500);
                      }}
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
                        {uploading ? 'Uploading...' : 'Upload Image'}
                      </Button>
                      {formData.image_url && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Image className="w-3 h-3" />
                          Image set
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, image_url: '' })}
                            className="ml-1"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                    </div>
                    {formData.image_url && (
                      <img src={formData.image_url} alt="Preview" className="w-full h-24 object-cover rounded-lg mt-2" />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief course description..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="overview">Full Overview</Label>
                  <Textarea
                    id="overview"
                    value={formData.overview}
                    onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                    placeholder="Detailed course overview..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eligibility">Eligibility</Label>
                  <Textarea
                    id="eligibility"
                    value={formData.eligibility}
                    onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                    placeholder="Who can apply..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="highlights">Key Highlights (one per line)</Label>
                  <Textarea
                    id="highlights"
                    value={formData.highlights}
                    onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                    placeholder="Industry projects&#10;Expert mentors&#10;Job assistance"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="career_outcomes">Career Outcomes (one per line)</Label>
                  <Textarea
                    id="career_outcomes"
                    value={formData.career_outcomes}
                    onChange={(e) => setFormData({ ...formData, career_outcomes: e.target.value })}
                    placeholder="Data Scientist&#10;ML Engineer&#10;Business Analyst"
                    rows={3}
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
                  <Button type="submit">
                    {editingCourse ? 'Update Course' : 'Create Course'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent>
        {courses.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No courses yet. Add your first course to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">
                      <div>
                        {course.title}
                        {course.is_featured && (
                          <Badge variant="secondary" className="ml-2">Featured</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>{course.duration}</TableCell>
                    <TableCell>{course.mode}</TableCell>
                    <TableCell>
                      <Badge variant={course.is_active ? 'default' : 'outline'}>
                        {course.is_active ? 'Active' : 'Hidden'}
                      </Badge>
                    </TableCell>
                    {isAdmin && (
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleActive(course)}
                          >
                            {course.is_active ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(course)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(course.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseManagement;
