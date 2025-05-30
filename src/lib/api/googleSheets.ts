import { Hospital } from '@/lib/types';

// Mock data for development
const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'Apollo Hospital',
    type: 'Private',
    rating: 4.5,
    price: 5000,
    address: 'Greams Road, Chennai',
    city: 'Chennai',
    treatments: ['Cardiology', 'Orthopedics', 'Neurology'],
    facilities: ['ICU', 'Operation Theater', 'Pharmacy'],
    contact: '+91-1234567890',
    email: 'info@apollo.com'
  },
  {
    id: '2',
    name: 'Max Super Speciality Hospital',
    type: 'Private',
    rating: 4.8,
    price: 7500,
    address: 'Saket, New Delhi',
    city: 'Delhi',
    treatments: ['Cardiology', 'Oncology', 'Pediatrics'],
    facilities: ['ICU', 'Operation Theater', 'Pharmacy'],
    contact: '+91-1234567891',
    email: 'info@maxhealthcare.com'
  },
  {
    id: '3',
    name: 'AIIMS Delhi',
    type: 'Government',
    rating: 4.7,
    price: 2000,
    address: 'Ansari Nagar, New Delhi',
    city: 'Delhi',
    treatments: ['All Specialties'],
    facilities: ['ICU', 'Operation Theater', 'Pharmacy'],
    contact: '+91-1234567892',
    email: 'info@aiims.edu'
  },
  {
    id: '4',
    name: 'Fortis Hospital',
    type: 'Private',
    rating: 4.6,
    price: 6000,
    address: 'Mulund West, Mumbai',
    city: 'Mumbai',
    treatments: ['Cardiology', 'Neurology', 'Orthopedics'],
    facilities: ['ICU', 'Operation Theater', 'Pharmacy'],
    contact: '+91-1234567893',
    email: 'info@fortishealthcare.com'
  },
  {
    id: '5',
    name: 'Lilavati Hospital',
    type: 'Private',
    rating: 4.4,
    price: 8000,
    address: 'Bandra West, Mumbai',
    city: 'Mumbai',
    treatments: ['Cardiology', 'Oncology', 'Pediatrics'],
    facilities: ['ICU', 'Operation Theater', 'Pharmacy'],
    contact: '+91-1234567894',
    email: 'info@lilavatihospital.com'
  },
  {
    id: '6',
    name: 'KEM Hospital',
    type: 'Government',
    rating: 4.3,
    price: 1500,
    address: 'Parel, Mumbai',
    city: 'Mumbai',
    treatments: ['All Specialties'],
    facilities: ['ICU', 'Operation Theater', 'Pharmacy'],
    contact: '+91-1234567895',
    email: 'info@kem.edu'
  },
  {
    id: '7',
    name: 'Narayana Health',
    type: 'Private',
    rating: 4.7,
    price: 5500,
    address: 'Bommasandra, Bangalore',
    city: 'Bangalore',
    treatments: ['Cardiology', 'Neurology', 'Orthopedics'],
    facilities: ['ICU', 'Operation Theater', 'Pharmacy'],
    contact: '+91-1234567896',
    email: 'info@narayanahealth.org'
  },
  {
    id: '8',
    name: 'Manipal Hospital',
    type: 'Private',
    rating: 4.5,
    price: 7000,
    address: 'Old Airport Road, Bangalore',
    city: 'Bangalore',
    treatments: ['Cardiology', 'Oncology', 'Pediatrics'],
    facilities: ['ICU', 'Operation Theater', 'Pharmacy'],
    contact: '+91-1234567897',
    email: 'info@manipalhospitals.com'
  },
  {
    id: '9',
    name: 'Victoria Hospital',
    type: 'Government',
    rating: 4.2,
    price: 1800,
    address: 'Fort Road, Bangalore',
    city: 'Bangalore',
    treatments: ['All Specialties'],
    facilities: ['ICU', 'Operation Theater', 'Pharmacy'],
    contact: '+91-1234567898',
    email: 'info@victoriahospital.edu'
  }
];

export async function filterHospitals(treatment: string, location: string): Promise<Hospital[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return mockHospitals.filter(hospital => {
    const matchesTreatment = !treatment || 
      hospital.treatments.some(t => t.toLowerCase().includes(treatment.toLowerCase()));
    const matchesLocation = !location || 
      hospital.city.toLowerCase().includes(location.toLowerCase());
    return matchesTreatment && matchesLocation;
  });
} 