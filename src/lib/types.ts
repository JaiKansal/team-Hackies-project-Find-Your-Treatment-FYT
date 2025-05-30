export interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  type: 'Government' | 'Private';
  rating: number;
  price: number;
  treatments: string[];
  facilities?: string[];
  contact?: string;
  email?: string;
}

export interface FilterOptions {
  priceRange: [number, number];
  minRating: number;
  hospitalType: ('Government' | 'Private' | 'Clinic')[];
}

export interface SortOption {
  field: 'price' | 'rating' | 'distance';
  direction: 'asc' | 'desc';
}

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  hospital: string;
  treatment: string;
}