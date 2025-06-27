import { Patient, MedicalRecord } from '../types';

// Mock patients data
export const patients: Patient[] = [
  {
    id: 'p1',
    name: 'Sophie Laurent',
    age: 42,
    recordNumber: 'PA-20589',
    lastVisit: '2023-05-15'
  },
  {
    id: 'p2',
    name: 'Marc Dupont',
    age: 67,
    recordNumber: 'PA-18754',
    lastVisit: '2023-06-02'
  },
  {
    id: 'p3',
    name: 'Émilie Moreau',
    age: 29,
    recordNumber: 'PA-21435',
    lastVisit: '2023-05-28'
  },
  {
    id: 'p4',
    name: 'Thomas Petit',
    age: 54,
    recordNumber: 'PA-19876',
    lastVisit: '2023-06-10'
  }
];

// Mock medical records data
export const medicalRecords: Record<string, MedicalRecord> = {
  p1: {
    id: 'mr1',
    patientId: 'p1',
    history: [
      {
        id: 'h1',
        date: '2023-05-15',
        description: 'Consultation pour douleurs lombaires chroniques. Recommandation de kinésithérapie.',
        doctorName: 'Dr. Martin Dubois'
      },
      {
        id: 'h2',
        date: '2022-11-03',
        description: 'Visite de routine. Tension artérielle normale.',
        doctorName: 'Dr. Martin Dubois'
      }
    ],
    prescriptions: [
      {
        id: 'pr1',
        date: '2023-05-15',
        medication: 'Doliprane 1000mg',
        dosage: '1 comprimé',
        instructions: 'Prendre 1 comprimé toutes les 6 heures si douleur. Ne pas dépasser 4 comprimés par jour.',
        doctorName: 'Dr. Martin Dubois'
      }
    ],
    allergies: [
      {
        id: 'a1',
        allergen: 'Pénicilline',
        severity: 'Moderate'
      }
    ],
    testResults: [
      {
        id: 't1',
        date: '2023-04-28',
        testName: 'Analyse sanguine',
        result: 'Normale',
        normalRange: '',
        notes: 'Tous les paramètres dans les valeurs de référence'
      }
    ]
  },
  p2: {
    id: 'mr2',
    patientId: 'p2',
    history: [
      {
        id: 'h3',
        date: '2023-06-02',
        description: 'Suivi d\'hypertension artérielle. Adaptation du traitement.',
        doctorName: 'Dr. Sophie Bernard'
      }
    ],
    prescriptions: [
      {
        id: 'pr2',
        date: '2023-06-02',
        medication: 'Amlodipine 5mg',
        dosage: '1 comprimé',
        instructions: 'Prendre 1 comprimé le matin au petit déjeuner.',
        doctorName: 'Dr. Sophie Bernard'
      }
    ],
    allergies: [],
    testResults: [
      {
        id: 't2',
        date: '2023-05-20',
        testName: 'Électrocardiogramme',
        result: 'Normal',
        notes: 'Rythme sinusal régulier'
      }
    ]
  },
  p3: {
    id: 'mr3',
    patientId: 'p3',
    history: [
      {
        id: 'h4',
        date: '2023-05-28',
        description: 'Consultation pour anxiété. Discussion sur les techniques de gestion du stress.',
        doctorName: 'Dr. Martin Dubois'
      }
    ],
    prescriptions: [],
    allergies: [
      {
        id: 'a2',
        allergen: 'Arachides',
        severity: 'Severe',
        notes: 'Nécessite un EpiPen en cas d\'exposition'
      }
    ],
    testResults: []
  },
  p4: {
    id: 'mr4',
    patientId: 'p4',
    history: [
      {
        id: 'h5',
        date: '2023-06-10',
        description: 'Suivi diabète type 2. Hémoglobine glyquée améliorée.',
        doctorName: 'Dr. Martin Dubois'
      }
    ],
    prescriptions: [
      {
        id: 'pr3',
        date: '2023-06-10',
        medication: 'Metformine 850mg',
        dosage: '2 comprimés',
        instructions: 'Prendre 1 comprimé matin et soir pendant les repas.',
        doctorName: 'Dr. Martin Dubois'
      }
    ],
    allergies: [],
    testResults: [
      {
        id: 't3',
        date: '2023-06-01',
        testName: 'Hémoglobine glyquée (HbA1c)',
        result: '6.8%',
        normalRange: '<7.0%',
        notes: 'Amélioration par rapport au dernier contrôle (7.2%)'
      }
    ]
  }
};

// Simulate NFC scan
export const simulateNfcScan = (nfcId: string): Promise<Patient | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Map NFC IDs to patient IDs - in a real app this would be secure
      const nfcMapping: Record<string, string> = {
        'nfc-12345': 'p1',
        'nfc-67890': 'p2',
        'nfc-54321': 'p3',
        'nfc-09876': 'p4'
      };
      
      const patientId = nfcMapping[nfcId];
      if (patientId) {
        const patient = patients.find(p => p.id === patientId);
        resolve(patient || null);
      } else {
        resolve(null);
      }
    }, 1500); // Simulate scanning delay
  });
};

// Get medical record by patient ID
export const getMedicalRecord = (patientId: string): Promise<MedicalRecord | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(medicalRecords[patientId] || null);
    }, 500);
  });
};