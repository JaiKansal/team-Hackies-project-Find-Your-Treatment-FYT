import { useState, useEffect, useMemo, useCallback } from 'react';
import { Hospital, FilterOptions, SortOption } from '../lib/types';
import { sortHospitals } from '../lib/utils';

const DEFAULT_FILTERS: FilterOptions = {
  priceRange: [0, 100000],
  minRating: 0,
  hospitalType: ['Government', 'Private', 'Clinic']
};

const DEFAULT_SORT: SortOption = {
  field: 'rating',
  direction: 'desc'
};

export default function useFilters(
  hospitals: Hospital[],
  initialFilters?: Partial<FilterOptions>,
  initialSort?: SortOption,
  userLocation?: { lat: number; long: number }
) {
  // Initialize filters with defaults and any provided initial values
  const [filters, setFilters] = useState<FilterOptions>(() => ({
    ...DEFAULT_FILTERS,
    ...initialFilters,
    priceRange: initialFilters?.priceRange || DEFAULT_FILTERS.priceRange,
    hospitalType: initialFilters?.hospitalType || DEFAULT_FILTERS.hospitalType
  }));

  const [sortOption, setSortOption] = useState<SortOption>(
    initialSort || DEFAULT_SORT
  );

  // Memoize the filtered and sorted hospitals
  const filteredHospitals = useMemo(() => {
    try {
      // Apply filters
      let result = hospitals.filter(hospital => {
        const matchesPrice = 
          hospital.price >= filters.priceRange[0] && 
          hospital.price <= filters.priceRange[1];
        
        const matchesRating = hospital.rating >= filters.minRating;
        
        const matchesType = filters.hospitalType.includes(hospital.type);
        
        return matchesPrice && matchesRating && matchesType;
      });

      // Apply sorting
      return sortHospitals(
        result, 
        sortOption, 
        userLocation?.lat, 
        userLocation?.long
      );
    } catch (error) {
      console.error('Error filtering/sorting hospitals:', error);
      return hospitals; // Return original list on error
    }
  }, [hospitals, filters, sortOption, userLocation]);

  // Memoize filter update function
  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      // Ensure price range is valid
      priceRange: newFilters.priceRange 
        ? [
            Math.max(0, newFilters.priceRange[0]),
            Math.min(100000, newFilters.priceRange[1])
          ]
        : prev.priceRange
    }));
  }, []);

  // Memoize sort update function
  const updateSort = useCallback((newSort: SortOption) => {
    setSortOption(newSort);
  }, []);

  // Reset filters to defaults
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSortOption(DEFAULT_SORT);
  }, []);

  return {
    filters,
    setFilters: updateFilters,
    sortOption,
    setSortOption: updateSort,
    filteredHospitals,
    resetFilters
  };
}