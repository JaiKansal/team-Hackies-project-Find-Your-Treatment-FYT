import { Hospital, SortOption } from './types';

// Constants
const EARTH_RADIUS_KM = 6371;
const DEG_TO_RAD = Math.PI / 180;
const MAX_DISTANCE_KM = 100; // Maximum reasonable distance to consider

// Types
interface Coordinates {
  lat: number;
  long: number;
}

interface DistanceResult {
  distance: number;
  isValid: boolean;
}

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): DistanceResult {
  try {
    // Validate coordinates
    if (!isValidCoordinate(lat1, lon1) || !isValidCoordinate(lat2, lon2)) {
      return { distance: 0, isValid: false };
    }

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = EARTH_RADIUS_KM * c; // Distance in km

    // Check if distance is within reasonable range
    return {
      distance: distance <= MAX_DISTANCE_KM ? distance : MAX_DISTANCE_KM,
      isValid: true
    };
  } catch (error) {
    console.error('Error calculating distance:', error);
    return { distance: 0, isValid: false };
  }
}

function deg2rad(deg: number): number {
  return deg * DEG_TO_RAD;
}

function isValidCoordinate(lat: number, lon: number): boolean {
  return (
    typeof lat === 'number' &&
    typeof lon === 'number' &&
    !isNaN(lat) &&
    !isNaN(lon) &&
    lat >= -90 &&
    lat <= 90 &&
    lon >= -180 &&
    lon <= 180
  );
}

// Sort hospitals based on sort option
export function sortHospitals(
  hospitals: Hospital[], 
  sortOption: SortOption,
  userLat?: number,
  userLong?: number
): Hospital[] {
  try {
    return [...hospitals].sort((a, b) => {
      switch (sortOption.field) {
        case 'price':
          return sortOption.direction === 'asc' ? a.price - b.price : b.price - a.price;
        
        case 'rating':
          return sortOption.direction === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        
        case 'distance':
          if (userLat && userLong) {
            const { distance: distanceA, isValid: isValidA } = calculateDistance(userLat, userLong, a.lat, a.long);
            const { distance: distanceB, isValid: isValidB } = calculateDistance(userLat, userLong, b.lat, b.long);
            
            // If either distance is invalid, sort by rating as fallback
            if (!isValidA || !isValidB) {
              return b.rating - a.rating;
            }
            
            return sortOption.direction === 'asc' ? distanceA - distanceB : distanceB - distanceA;
          }
          return 0;
        
        default:
          return 0;
      }
    });
  } catch (error) {
    console.error('Error sorting hospitals:', error);
    return hospitals; // Return original array on error
  }
}

// Format price to currency
export function formatPrice(price: number): string {
  try {
    if (typeof price !== 'number' || isNaN(price)) {
      return '₹0';
    }
    return `₹${Math.round(price).toLocaleString()}`;
  } catch (error) {
    console.error('Error formatting price:', error);
    return '₹0';
  }
}

// Get user's current location
export function getUserLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Validate coordinates
        if (!isValidCoordinate(latitude, longitude)) {
          reject(new Error('Invalid coordinates received'));
          return;
        }

        resolve({
          lat: latitude,
          long: longitude
        });
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location. ';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please enable location access in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
        }
        
        reject(new Error(errorMessage));
      },
      options
    );
  });
}