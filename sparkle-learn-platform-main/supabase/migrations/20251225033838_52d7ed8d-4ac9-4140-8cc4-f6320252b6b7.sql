-- Drop existing restrictive policies on courses
DROP POLICY IF EXISTS "Admins can manage courses" ON public.courses;
DROP POLICY IF EXISTS "Anyone can view active courses" ON public.courses;

-- Create permissive policies for courses
-- Admins can do everything on courses
CREATE POLICY "Admins can manage all courses" 
ON public.courses 
FOR ALL 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Anyone (including anonymous) can view active courses
CREATE POLICY "Public can view active courses" 
ON public.courses 
FOR SELECT 
TO anon, authenticated
USING (is_active = true);

-- Drop existing restrictive policies on enquiries
DROP POLICY IF EXISTS "Admins can manage enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Anyone can create enquiries" ON public.enquiries;

-- Create permissive policies for enquiries
-- Admins can do everything on enquiries
CREATE POLICY "Admins can manage all enquiries" 
ON public.enquiries 
FOR ALL 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Anyone can create enquiries (for the apply form)
CREATE POLICY "Anyone can submit enquiries" 
ON public.enquiries 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);