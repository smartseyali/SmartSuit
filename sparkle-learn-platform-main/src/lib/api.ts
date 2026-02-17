import config from '@/config';

const API_BASE_URL = config.apiBaseUrl;
const SUBSCRIBER_ID = config.subscriberId;

export interface ApiProductList {
  id: string;
  name: string;
  code: string;
  categoryName: string;
  brandName: string;
  slug: string;
  thumbnailUrl: string;
  price: number;
  shortDescription?: string;
  serviceType?: string;
  duration?: string;
}

// Categories
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${SUBSCRIBER_ID}/categories`);
    if (!response.ok) {
      console.warn('Categories API failed, falling back to defaults');
      return ['Diploma Courses']; // Fallback based on your product data
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return ['Diploma Courses']; // Fallback
  }
};


export interface ApiProductDetail extends ApiProductList {
  shortDescription: string;
  longDescription: string;
  metaTitle: string;
  metaDescription: string;
  media: {
    url: string;
    type: string;
    fileName: string;
  }[];
  attributes: {
    name: string;
    value: string;
  }[];
  features: string[]; // This might map to Highlights
  variants: any[];
  prices: any[];
  serviceDetails?: {
    duration: string;
    type: string;
  };
}

export const fetchPrograms = async (): Promise<ApiProductList[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${SUBSCRIBER_ID}/products`);
    if (!response.ok) {
      console.error('Failed to fetch programs:', response.statusText);
      return [];
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching programs:', error);
    // Return empty array instead of throwing, so the UI can handle "No programs found" gracefully
    return [];
  }
};

export const fetchProgramDetail = async (id: string): Promise<ApiProductDetail> => {
  // If id is a UUID, use it directly. If it's a slug, we might need a different endpoint 
  // OR the backend needs to support slug lookup.
  // The backend GetProductDetailAsync takes a GUID.
  // BUT the frontend uses Slugs in URLs (e.g. /programs/data-science-masters).
  // The current backend solution requires ID. 
  // Workaround: We will first fetch all products to find the ID matching the slug, 
  // THEN fetch details. This is not optimal but works without backend changes for now.
  // OPTIMIZATION LATER: Add GetProductBySlug endpoint.

  const allProducts = await fetchPrograms();
  const product = allProducts.find(p => p.slug === id || p.id === id);

  if (!product) {
    throw new Error('Program not found');
  }

  const response = await fetch(`${API_BASE_URL}/${SUBSCRIBER_ID}/products/${product.id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch program detail');
  }
  return response.json();
};

export interface EnquiryDto {
  name: string;
  email: string;
  phone: string;
  courseId?: string;
  courseName?: string;
  message?: string;
}

export const createEnquiry = async (enquiry: EnquiryDto): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${SUBSCRIBER_ID}/enquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(enquiry)
  });

  if (!response.ok) {
    throw new Error('Failed to submit enquiry');
  }
};

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: string;
  isFeatured: boolean;
}

export const fetchGallery = async (): Promise<GalleryItem[]> => {
  const response = await fetch(`${API_BASE_URL}/${SUBSCRIBER_ID}/gallery`);
  if (!response.ok) {
    return [];
  }
  return response.json();
};
