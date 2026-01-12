-- Create storage bucket for media uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true);

-- Create policy for public read access on media bucket
CREATE POLICY "Public can view media" 
ON storage.objects 
FOR SELECT 
TO anon, authenticated
USING (bucket_id = 'media');

-- Create policy for admins to upload media
CREATE POLICY "Admins can upload media" 
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'media' AND has_role(auth.uid(), 'admin'::app_role));

-- Create policy for admins to update media
CREATE POLICY "Admins can update media" 
ON storage.objects 
FOR UPDATE 
TO authenticated
USING (bucket_id = 'media' AND has_role(auth.uid(), 'admin'::app_role));

-- Create policy for admins to delete media
CREATE POLICY "Admins can delete media" 
ON storage.objects 
FOR DELETE 
TO authenticated
USING (bucket_id = 'media' AND has_role(auth.uid(), 'admin'::app_role));

-- Create gallery table
CREATE TABLE public.gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image', -- 'image' or 'video'
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on gallery
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Gallery RLS policies
CREATE POLICY "Public can view active gallery items" 
ON public.gallery 
FOR SELECT 
TO anon, authenticated
USING (is_active = true);

CREATE POLICY "Admins can manage gallery" 
ON public.gallery 
FOR ALL 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at on gallery
CREATE TRIGGER update_gallery_updated_at
BEFORE UPDATE ON public.gallery
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();