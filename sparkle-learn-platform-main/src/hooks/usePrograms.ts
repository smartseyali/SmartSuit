import { useQuery } from '@tanstack/react-query';
import { fetchPrograms, fetchProgramDetail, fetchCategories, ApiProductDetail } from '@/lib/api';
import { healthcarePrograms, Program as UIProgram } from '@/data/programsData';

export type Program = UIProgram;

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const apiCategories = await fetchCategories();
        const localCategories = Array.from(new Set(healthcarePrograms.map(p => p.category)));
        // Merge and remove duplicates
        return Array.from(new Set([...localCategories, ...apiCategories]));
      } catch (error) {
        console.error('Error fetching categories from API:', error);
        return Array.from(new Set(healthcarePrograms.map(p => p.category)));
      }
    }
  });
};

// Helper to safely parse JSON attributes
const parseJsonAttribute = <T>(attributes: { name: string; value: string }[], key: string, defaultValue: T): T => {
  if (!attributes) return defaultValue;
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
  const duration = apiProduct.duration ||
    apiProduct.serviceDetails?.duration ||
    apiProduct.attributes?.find(a => a.name === 'Duration')?.value ||
    'TBD';
  const mode = (apiProduct.serviceType ||
    apiProduct.serviceDetails?.type ||
    apiProduct.attributes?.find(a => a.name === 'Mode')?.value ||
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
  }).format(apiProduct.price || 0);

  return {
    id: apiProduct.slug || apiProduct.id,
    name: apiProduct.name,
    category: apiProduct.categoryName || 'General',
    duration: duration,
    mode: mode,
    fees: formattedFees,
    description: apiProduct.shortDescription || apiProduct.metaDescription || apiProduct.name, // Use short desc for cards
    highlights: apiProduct.features && apiProduct.features.length > 0 ? apiProduct.features : ['Industry recognized'],
    curriculum: curriculum,
    eligibility: eligibility,
    careerOutcomes: careerOutcomes,
    image: apiProduct.thumbnailUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', // Fallback
    featured: false // Default
  };
};

export const usePrograms = () => {
  return useQuery({
    queryKey: ['programs'],
    queryFn: async () => {
      try {
        const apiProducts = await fetchPrograms();
        const adaptedApiPrograms = apiProducts.map(p => ({
          id: p.slug || p.id,
          name: p.name,
          category: p.categoryName || 'General',
          duration: p.duration || 'TBD',
          mode: (p.serviceType as any) || 'Online',
          fees: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p.price || 0),
          description: p.shortDescription || p.name,
          highlights: [],
          curriculum: [],
          eligibility: [],
          careerOutcomes: [],
          image: p.thumbnailUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
          featured: false
        }));

        // Merge local healthcare data with API data
        // We use a Map to ensure unique IDs (prioritize local)
        const allProgramsMap = new Map();

        // Add API programs first
        adaptedApiPrograms.forEach(p => allProgramsMap.set(p.id, p));

        // Add/Overwrite with local healthcare programs (so they take precedence)
        healthcarePrograms.forEach(p => allProgramsMap.set(p.id, p));

        return Array.from(allProgramsMap.values());
      } catch (error) {
        console.error('Error fetching programs from API:', error);
        return healthcarePrograms;
      }
    }
  });
};

export const useProgram = (id: string) => {
  return useQuery({
    queryKey: ['program', id],
    queryFn: async () => {
      // First check local data
      const localProgram = healthcarePrograms.find(p => p.id === id);
      if (localProgram) return localProgram;

      // Fallback to API
      const apiDetail = await fetchProgramDetail(id);
      return adaptProductToProgram(apiDetail);
    },
    enabled: !!id
  });
};
