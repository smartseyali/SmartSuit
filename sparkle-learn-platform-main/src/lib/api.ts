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
  const response = await fetch(`${API_BASE_URL}/${SUBSCRIBER_ID}/categories`);
  if (!response.ok) {
     return []; // fallback
  }
  return response.json();
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
  const response = await fetch(`${API_BASE_URL}/${SUBSCRIBER_ID}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch programs');
  }
  return response.json();
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
