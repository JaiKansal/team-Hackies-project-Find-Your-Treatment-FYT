import axios, { AxiosError } from 'axios';
import { Hospital, BookingFormData } from './types';

// Constants
const SHEET_ENDPOINT = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_ENDPOINT || 'https://your-sheet-api-endpoint.com';
const API_TIMEOUT = 10000; // 10 seconds

// Types
interface SheetRow {
  ID: string;
  Name: string;
  Location: string;
  Lat: string;
  Long: string;
  Treatment: string;
  Price: string;
  Rating: string;
  Type: string;
  Description: string;
  BookingLink?: string;
  Address?: string;
  Contact?: string;
  Facilities?: string;
}

// Error handling
class APIError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'APIError';
  }
}

// Data validation
function validateHospitalData(data: SheetRow): boolean {
  return (
    typeof data.ID === 'string' &&
    typeof data.Name === 'string' &&
    typeof data.Location === 'string' &&
    !isNaN(parseFloat(data.Lat)) &&
    !isNaN(parseFloat(data.Long)) &&
    typeof data.Treatment === 'string' &&
    !isNaN(parseFloat(data.Price)) &&
    !isNaN(parseFloat(data.Rating)) &&
    typeof data.Type === 'string'
  );
}

function parseHospitalData(row: SheetRow): Hospital {
  if (!validateHospitalData(row)) {
    throw new APIError('Invalid hospital data format');
  }

  return {
    id: row.ID,
    name: row.Name,
    location: row.Location,
    lat: parseFloat(row.Lat),
    long: parseFloat(row.Long),
    treatment: row.Treatment,
    treatments: row.Treatment.split(',').map(t => t.trim()),
    price: parseFloat(row.Price),
    rating: parseFloat(row.Rating),
    type: row.Type,
    description: row.Description || '',
    bookingLink: row.BookingLink,
    address: row.Address || row.Location,
    contact: row.Contact || 'N/A',
    facilities: (row.Facilities || '').split(',').map(f => f.trim()).filter(Boolean),
  };
}

// API functions
export async function fetchHospitals(): Promise<Hospital[]> {
  try {
    const response = await axios.get<SheetRow[]>(SHEET_ENDPOINT, {
      timeout: API_TIMEOUT,
    });

    if (!Array.isArray(response.data)) {
      throw new APIError('Invalid response format');
    }

    return response.data.map(row => {
      try {
        return parseHospitalData(row);
      } catch (error) {
        console.error('Error parsing hospital data:', error);
        return null;
      }
    }).filter((hospital): hospital is Hospital => hospital !== null);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new APIError(
        `Failed to fetch hospitals: ${error.message}`,
        error.response?.status
      );
    }
    throw error;
  }
}

export async function fetchHospitalById(id: string): Promise<Hospital | null> {
  try {
    const hospitals = await fetchHospitals();
    const hospital = hospitals.find(h => h.id === id);
    
    if (!hospital) {
      throw new APIError(`Hospital with ID ${id} not found`, 404);
    }
    
    return hospital;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(`Failed to fetch hospital: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function searchHospitals(query: string, location?: string): Promise<Hospital[]> {
  try {
    const hospitals = await fetchHospitals();
    
    if (!query && !location) {
      return hospitals;
    }
    
    const searchQuery = query?.toLowerCase().trim();
    const searchLocation = location?.toLowerCase().trim();
    
    return hospitals.filter(hospital => {
      const matchesTreatment = searchQuery
        ? hospital.treatments.some(t => t.toLowerCase().includes(searchQuery))
        : true;
      
      const matchesLocation = searchLocation
        ? hospital.location.toLowerCase().includes(searchLocation)
        : true;
      
      return matchesTreatment && matchesLocation;
    });
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(`Failed to search hospitals: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function submitBooking(bookingData: BookingFormData): Promise<boolean> {
  try {
    // Validate booking data
    if (!bookingData.name || !bookingData.phone || !bookingData.email || !bookingData.date || !bookingData.time) {
      throw new APIError('Missing required booking information');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingData.email)) {
      throw new APIError('Invalid email format');
    }

    // Validate phone format (basic)
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(bookingData.phone)) {
      throw new APIError('Invalid phone number format');
    }

    // Validate date (must be in the future)
    const bookingDate = new Date(`${bookingData.date}T${bookingData.time}`);
    if (bookingDate < new Date()) {
      throw new APIError('Booking date must be in the future');
    }

    await axios.post(`${SHEET_ENDPOINT}/booking`, bookingData, {
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return true;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    if (error instanceof AxiosError) {
      throw new APIError(
        `Failed to submit booking: ${error.message}`,
        error.response?.status
      );
    }
    throw new APIError(`Failed to submit booking: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}