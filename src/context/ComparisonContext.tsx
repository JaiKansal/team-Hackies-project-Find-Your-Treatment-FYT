'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Hospital } from '@/lib/types';

interface ComparisonContextType {
  comparisonList: Hospital[];
  addToComparison: (hospital: Hospital) => void;
  removeFromComparison: (hospital: Hospital) => void;
  clearComparison: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparisonList, setComparisonList] = useState<Hospital[]>([]);

  const addToComparison = (hospital: Hospital) => {
    if (comparisonList.length >= 3) {
      alert('You can only compare up to 3 hospitals at a time');
      return;
    }
    if (!comparisonList.some(h => h.id === hospital.id)) {
      setComparisonList([...comparisonList, hospital]);
    }
  };

  const removeFromComparison = (hospital: Hospital) => {
    setComparisonList(comparisonList.filter(h => h.id !== hospital.id));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  return (
    <ComparisonContext.Provider value={{ comparisonList, addToComparison, removeFromComparison, clearComparison }}>
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
} 