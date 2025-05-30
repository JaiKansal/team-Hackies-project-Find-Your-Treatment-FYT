// Types for our hospital data
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

// Types for booking system
export interface Booking {
  id: string;
  userId: string;
  hospitalId: string;
  treatment: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// Mock data for development (will be replaced with actual Google Sheets API)
const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'Apollo Hospital',
    address: 'Greams Road, Chennai',
    city: 'Chennai',
    type: 'Private',
    rating: 4.5,
    price: 5000,
    treatments: ['Cardiology', 'Orthopedics', 'Neurosciences', 'Oncology', 'Pediatrics', 'Gynecology'],
    facilities: ['ICU', 'Operation Theater', 'Diagnostic Center', 'Emergency Care', 'Pharmacy', 'Cafeteria'],
    contact: '+91-1234567890',
    email: 'info@apollo.com'
  },
  {
    id: '2',
    name: 'AIIMS',
    address: 'Ansari Nagar, New Delhi',
    city: 'Delhi',
    type: 'Government',
    rating: 4.7,
    price: 2000,
    treatments: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Gynecology', 'Dermatology'],
    facilities: ['ICU', 'Operation Theater', 'Research Center', 'Emergency Care', 'Pharmacy', 'Cafeteria'],
    contact: '+91-2345678901',
    email: 'info@aiims.edu'
  },
  {
    id: '3',
    name: 'Fortis Hospital',
    address: 'Bannerghatta Road, Bangalore',
    city: 'Bangalore',
    type: 'Private',
    rating: 4.3,
    price: 6000,
    treatments: ['Cardiology', 'Oncology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology'],
    facilities: ['ICU', 'Operation Theater', 'Cancer Center', 'Emergency Care', 'Pharmacy', 'Cafeteria'],
    contact: '+91-3456789012',
    email: 'info@fortis.com'
  },
  {
    id: '4',
    name: 'Medanta',
    address: 'Sector 38, Gurgaon',
    city: 'Delhi',
    type: 'Private',
    rating: 4.6,
    price: 7000,
    treatments: ['Orthopedics', 'Cardiology', 'Neurology', 'Oncology', 'Pediatrics', 'Gynecology'],
    facilities: ['ICU', 'Operation Theater', 'Rehabilitation Center', 'Emergency Care', 'Pharmacy', 'Cafeteria'],
    contact: '+91-4567890123',
    email: 'info@medanta.org'
  },
  {
    id: '5',
    name: 'Lilavati Hospital',
    address: 'Bandra West, Mumbai',
    city: 'Mumbai',
    type: 'Private',
    rating: 4.4,
    price: 8000,
    treatments: ['Neurology', 'Cardiology', 'Orthopedics', 'Oncology', 'Pediatrics', 'Dermatology'],
    facilities: ['ICU', 'Operation Theater', 'Stroke Unit', 'Emergency Care', 'Pharmacy', 'Cafeteria'],
    contact: '+91-5678901234',
    email: 'info@lilavatihospital.com'
  },
  {
    id: '6',
    name: 'Manipal Hospital',
    address: 'Old Airport Road, Bangalore',
    city: 'Bangalore',
    type: 'Private',
    rating: 4.2,
    price: 9000,
    treatments: ['Oncology', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Gynecology'],
    facilities: ['ICU', 'Operation Theater', 'Cancer Center', 'Emergency Care', 'Pharmacy', 'Cafeteria'],
    contact: '+91-6789012345',
    email: 'info@manipalhospitals.com'
  },
  {
    id: '7',
    name: 'Government General Hospital',
    address: 'Park Town, Chennai',
    city: 'Chennai',
    type: 'Government',
    rating: 4.0,
    price: 1000,
    treatments: ['Dialysis', 'General Medicine', 'Pediatrics', 'Gynecology', 'Orthopedics', 'Dermatology'],
    facilities: ['ICU', 'Operation Theater', 'Dialysis Unit', 'Emergency Care', 'Pharmacy', 'Cafeteria'],
    contact: '+91-7890123456',
    email: 'info@gghospital.gov.in'
  },
  {
    id: '8',
    name: 'Columbia Asia',
    address: 'Yeshwanthpur, Bangalore',
    city: 'Bangalore',
    type: 'Private',
    rating: 4.1,
    price: 5500,
    treatments: ['Orthopedics', 'Cardiology', 'Neurology', 'Oncology', 'Pediatrics', 'Gynecology'],
    facilities: ['ICU', 'Operation Theater', 'Sports Medicine', 'Emergency Care', 'Pharmacy', 'Cafeteria'],
    contact: '+91-8901234567',
    email: 'info@columbiaasia.com'
  },
  {
    id: '9',
    name: 'Max Healthcare',
    address: 'Saket, New Delhi',
    city: 'Delhi',
    type: 'Private',
    rating: 4.3,
    price: 5500,
    treatments: ['Cardiology', 'Neurology', 'Orthopedics', 'Oncology', 'Pediatrics', 'Gynecology'],
    facilities: ['ICU', 'Operation Theater', 'Heart Institute', 'Emergency Care', 'Pharmacy', 'Cafeteria'],
    contact: '+91-9012345678',
    email: 'info@maxhealthcare.com'
  },
  {
    id: '10',
    name: 'Tata Memorial Hospital',
    address: 'Parel, Mumbai',
    city: 'Mumbai',
    type: 'Government',
    rating: 4.8,
    price: 3000,
    treatments: ['Oncology', 'Radiation Therapy', 'Surgical Oncology', 'Cardiology', 'Pediatrics', 'Gynecology'],
    facilities: ['ICU', 'Operation Theater', 'Cancer Research Center', 'Emergency Care', 'Pharmacy', 'Cafeteria'],
    contact: '+91-0123456789',
    email: 'info@tmc.gov.in'
  }
];

// Mock bookings data
const mockBookings: Booking[] = [];

// Function to fetch hospitals from Google Sheets (mock implementation for now)
export async function fetchHospitals(): Promise<Hospital[]> {
  // In a real implementation, this would fetch data from Google Sheets API
  // For now, we'll return mock data
  return mockHospitals;
}

// Function to fetch a specific hospital by ID
export async function getHospitalById(id: string): Promise<Hospital | null> {
  try {
    const hospital = mockHospitals.find(h => h.id === id);
    return hospital || null;
  } catch (error) {
    console.error('Error fetching hospital by ID:', error);
    return null;
  }
}

// Function to filter hospitals by treatment and location
export async function filterHospitals(treatment?: string, location?: string): Promise<Hospital[]> {
  let filteredHospitals = mockHospitals;
  
  if (treatment) {
    filteredHospitals = filteredHospitals.filter(h => 
      h.treatments.some(t => t.toLowerCase().includes(treatment.toLowerCase()))
    );
  }
  
  if (location) {
    filteredHospitals = filteredHospitals.filter(h => 
      h.city.toLowerCase() === location.toLowerCase()
    );
  }
  
  return filteredHospitals;
}

// Function to submit a booking (in a real app, this would add a row to Google Sheets)
export async function submitBooking(bookingData: any): Promise<{ success: boolean, message: string }> {
  // In a real implementation, this would add a row to Google Sheets
  // For now, we'll just return a success message
  console.log('Booking submitted:', bookingData);
  return { success: true, message: 'Booking submitted successfully!' };
}

// Function to sort hospitals by various criteria
export async function sortHospitals(hospitals: Hospital[], sortBy: 'price' | 'rating' | 'name', order: 'asc' | 'desc' = 'asc'): Promise<Hospital[]> {
  return [...hospitals].sort((a, b) => {
    if (sortBy === 'price' || sortBy === 'rating') {
      return order === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    }
    return order === 'asc' 
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });
}

// Function to filter hospitals by price range
export async function filterByPriceRange(hospitals: Hospital[], minPrice: number, maxPrice: number): Promise<Hospital[]> {
  return hospitals.filter(hospital => 
    hospital.price >= minPrice && hospital.price <= maxPrice
  );
}

// Function to filter hospitals by type
export async function filterByType(hospitals: Hospital[], type: 'Government' | 'Private'): Promise<Hospital[]> {
  return hospitals.filter(hospital => hospital.type === type);
}

// Function to get unique treatments across all hospitals
export async function getUniqueTreatments(): Promise<string[]> {
  const treatments = new Set<string>();
  mockHospitals.forEach(hospital => {
    hospital.treatments.forEach(treatment => treatments.add(treatment));
  });
  return Array.from(treatments).sort();
}

// Function to get unique facilities across all hospitals
export async function getUniqueFacilities(): Promise<string[]> {
  const facilities = new Set<string>();
  mockHospitals.forEach(hospital => {
    hospital.facilities?.forEach(facility => facilities.add(facility));
  });
  return Array.from(facilities).sort();
}

// Function to get hospitals by treatment
export async function getHospitalsByTreatment(treatment: string): Promise<Hospital[]> {
  return mockHospitals.filter(hospital =>
    hospital.treatments.some(t => t.toLowerCase().includes(treatment.toLowerCase()))
  );
}

// Function to get hospitals by facility
export async function getHospitalsByFacility(facility: string): Promise<Hospital[]> {
  return mockHospitals.filter(hospital =>
    hospital.facilities?.some(f => f.toLowerCase().includes(facility.toLowerCase()))
  );
}

// Function to compare two hospitals
export async function compareHospitals(hospital1Id: string, hospital2Id: string): Promise<{
  hospital1: Hospital | null;
  hospital2: Hospital | null;
  commonTreatments: string[];
  commonFacilities: string[];
  priceDifference: number;
  ratingDifference: number;
}> {
  const hospital1 = mockHospitals.find(h => h.id === hospital1Id) || null;
  const hospital2 = mockHospitals.find(h => h.id === hospital2Id) || null;

  if (!hospital1 || !hospital2) {
    return {
      hospital1,
      hospital2,
      commonTreatments: [],
      commonFacilities: [],
      priceDifference: 0,
      ratingDifference: 0
    };
  }

  const commonTreatments = hospital1.treatments.filter(treatment =>
    hospital2.treatments.includes(treatment)
  );

  const commonFacilities = (hospital1.facilities || []).filter(facility =>
    hospital2.facilities?.includes(facility)
  );

  return {
    hospital1,
    hospital2,
    commonTreatments,
    commonFacilities,
    priceDifference: Math.abs(hospital1.price - hospital2.price),
    ratingDifference: Math.abs(hospital1.rating - hospital2.rating)
  };
}

// Function to get nearby hospitals (mock implementation)
export async function getNearbyHospitals(city: string, limit: number = 5): Promise<Hospital[]> {
  return mockHospitals
    .filter(hospital => hospital.city.toLowerCase() === city.toLowerCase())
    .slice(0, limit);
}

// Function to get top rated hospitals
export async function getTopRatedHospitals(limit: number = 5): Promise<Hospital[]> {
  return [...mockHospitals]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

// Function to get affordable hospitals
export async function getAffordableHospitals(limit: number = 5): Promise<Hospital[]> {
  return [...mockHospitals]
    .sort((a, b) => a.price - b.price)
    .slice(0, limit);
}

// Function to get hospitals by treatment and price range
export async function getHospitalsByTreatmentAndPrice(
  treatment: string,
  minPrice: number,
  maxPrice: number
): Promise<Hospital[]> {
  return mockHospitals.filter(hospital =>
    hospital.treatments.some(t => t.toLowerCase().includes(treatment.toLowerCase())) &&
    hospital.price >= minPrice &&
    hospital.price <= maxPrice
  );
}

// Function to get hospitals by treatment and type
export async function getHospitalsByTreatmentAndType(
  treatment: string,
  type: 'Government' | 'Private'
): Promise<Hospital[]> {
  return mockHospitals.filter(hospital =>
    hospital.treatments.some(t => t.toLowerCase().includes(treatment.toLowerCase())) &&
    hospital.type === type
  );
}

// Function to create a new booking
export async function createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
  const newBooking: Booking = {
    ...bookingData,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  mockBookings.push(newBooking);
  return newBooking;
}

// Function to get bookings by user ID
export async function getUserBookings(userId: string): Promise<Booking[]> {
  return mockBookings.filter(booking => booking.userId === userId);
}

// Function to get bookings by hospital ID
export async function getHospitalBookings(hospitalId: string): Promise<Booking[]> {
  return mockBookings.filter(booking => booking.hospitalId === hospitalId);
}

// Function to update booking status
export async function updateBookingStatus(bookingId: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<Booking | null> {
  const bookingIndex = mockBookings.findIndex(booking => booking.id === bookingId);
  if (bookingIndex === -1) return null;

  const updatedBooking = {
    ...mockBookings[bookingIndex],
    status,
    updatedAt: new Date().toISOString()
  };
  mockBookings[bookingIndex] = updatedBooking;
  return updatedBooking;
}

// Function to check booking availability
export async function checkBookingAvailability(
  hospitalId: string,
  date: string,
  time: string
): Promise<boolean> {
  const existingBookings = mockBookings.filter(
    booking => 
      booking.hospitalId === hospitalId &&
      booking.date === date &&
      booking.time === time &&
      booking.status !== 'cancelled'
  );
  return existingBookings.length === 0;
}

// Function to get available time slots
export async function getAvailableTimeSlots(hospitalId: string, date: string): Promise<string[]> {
  const allTimeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const bookedSlots = mockBookings
    .filter(booking => 
      booking.hospitalId === hospitalId &&
      booking.date === date &&
      booking.status !== 'cancelled'
    )
    .map(booking => booking.time);

  return allTimeSlots.filter(slot => !bookedSlots.includes(slot));
}

// Function to cancel booking
export async function cancelBooking(bookingId: string): Promise<Booking | null> {
  return updateBookingStatus(bookingId, 'cancelled');
}

// Function to get booking details
export async function getBookingDetails(bookingId: string): Promise<Booking | null> {
  return mockBookings.find(booking => booking.id === bookingId) || null;
}

// Function to get upcoming bookings
export async function getUpcomingBookings(userId: string): Promise<Booking[]> {
  const now = new Date();
  return mockBookings
    .filter(booking => 
      booking.userId === userId &&
      new Date(booking.date) >= now &&
      booking.status !== 'cancelled'
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

// Function to get past bookings
export async function getPastBookings(userId: string): Promise<Booking[]> {
  const now = new Date();
  return mockBookings
    .filter(booking => 
      booking.userId === userId &&
      new Date(booking.date) < now
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}