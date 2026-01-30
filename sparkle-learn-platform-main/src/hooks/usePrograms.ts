import { useQuery } from '@tanstack/react-query';
import { fetchPrograms, fetchProgramDetail, fetchCategories, ApiProductDetail } from '@/lib/api';

export interface Program {
  id: string;
  name: string;
  category: string;
  duration: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  fees: string;
  description: string;
  longDescription?: string;
  highlights: string[];
  curriculum: {
    title: string;
    topics: string[];
  }[];
  eligibility: string[];
  careerOutcomes: string[];
  image: string;
  featured: boolean;
}

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories
    });
};

// Helper to safely parse JSON attributes
const parseJsonAttribute = <T>(attributes: { name: string; value: string }[], key: string, defaultValue: T): T => {
  const attr = attributes.find(a => a.name === key);
  if (!attr) return defaultValue;
  try {
    return JSON.parse(attr.value) as T;
  } catch (e) {
    console.warn(`Failed to parse attribute ${key}`, e);
    return defaultValue;
  }
};

// Adapter function to convert API response to UI Program model
const adaptProductToProgram = (apiProduct: ApiProductDetail): Program => {
  // Extract simple attributes
  const duration = apiProduct.serviceDetails?.duration || 
                   apiProduct.attributes.find(a => a.name === 'Duration')?.value || 
                   'TBD';
  const mode = (apiProduct.serviceDetails?.type || 
               apiProduct.attributes.find(a => a.name === 'Mode')?.value || 
               'Online') as 'Online' | 'Offline' | 'Hybrid';
  
  // Parse complex JSON attributes
  const curriculum = parseJsonAttribute(apiProduct.attributes, 'JSON_Curriculum', []);
  const eligibility = parseJsonAttribute(apiProduct.attributes, 'JSON_Eligibility', []);
  const careerOutcomes = parseJsonAttribute(apiProduct.attributes, 'JSON_CareerOutcomes', []);

  // Price formatting
  const formattedFees = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(apiProduct.price);

  return {
    id: apiProduct.slug || apiProduct.id,
    name: apiProduct.name,
    category: apiProduct.categoryName,
    duration: duration,
    mode: mode,
    fees: formattedFees,
    description: apiProduct.shortDescription || apiProduct.metaDescription, // Use short desc for cards
    highlights: apiProduct.features && apiProduct.features.length > 0 ? apiProduct.features : ['Industry recognized'],
    curriculum: curriculum,
    eligibility: eligibility,
    careerOutcomes: careerOutcomes,
    image: apiProduct.thumbnailUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', // Fallback
    featured: false, // Default
    longDescription: apiProduct.longDescription || ''
  };
};

export const usePrograms = () => {
  return useQuery({
    queryKey: ['programs'],
    queryFn: async () => {
      const apiProducts = await fetchPrograms();
      // For the list view, we might not have all details (attributes etc) if the list endpoint is lightweight.
      // However, the current requirement is to render the *list* first.
      // If the list endpoint doesn't return attributes/features, we might need adjustments.
      // Looking at ClientProductListDto, it DOES NOT have attributes/features.
      // It has: Name, Code, Category, Brand, Slug, Price, Thumbnail.
      // The UI 'Programs.tsx' needs: ID, Name, Category, Description, Image, Mode, Duration.
      
      // ISSUE: ClientProductListDto misses Description, Mode, Duration.
      // WORKAROUND: We will fetch the list, mapped minimally. 
      // Ideally we should update the List DTO. For now we use placeholders or fetch details for each (N+1) - bad performance but accurate.
      // BETTER: For the list page, let's just use what we have and maybe simple defaults, or just assume the List DTO will be updated later.
      
      
      return apiProducts.map(p => ({
        id: p.slug || p.id,
        name: p.name,
        category: p.categoryName || 'General',
        duration: p.duration || 'TBD',
        mode: (p.serviceType as any) || 'Online', 
        fees: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p.price),
        description: p.shortDescription || p.name,
        highlights: [],
        curriculum: [],
        eligibility: [],
        careerOutcomes: [],
        image: p.thumbnailUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
        featured: false // The API currently doesn't return featured status for list, assume false or update API.
      }));
    }
  });
};

export const useProgram = (id: string) => {
  return useQuery({
    queryKey: ['program', id],
    queryFn: async () => {
      const apiDetail = await fetchProgramDetail(id);
      return adaptProductToProgram(apiDetail);
    },
    enabled: !!id
  });
};
