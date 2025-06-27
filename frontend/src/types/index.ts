export interface Doctor {
  id: string;
  name: string;
  email: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  recordNumber: string;
  lastVisit?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  history: MedicalHistoryItem[];
  prescriptions: Prescription[];
  allergies: Allergy[];
  testResults: TestResult[];
}

export interface MedicalHistoryItem {
  id: string;
  date: string;
  description: string;
  doctorName: string;
}

export interface Prescription {
  id: string;
  date: string;
  medication: string;
  dosage: string;
  instructions: string;
  doctorName: string;
}

export interface Allergy {
  id: string;
  allergen: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  notes?: string;
}

export interface TestResult {
  id: string;
  date: string;
  testName: string;
  result: string;
  normalRange?: string;
  notes?: string;
}