import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { patients, getMedicalRecord } from '../data/mockData';
import PatientHeader from '../components/patient/PatientHeader';
import MedicalTabs from '../components/patient/MedicalTabs';
import Button from '../components/ui/Button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { MedicalRecord, Patient } from '../types';

const PatientRecord: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Find patient in our mock data
        const foundPatient = patients.find(p => p.id === id);
        
        if (!foundPatient) {
          setError('Patient non trouvé');
          setLoading(false);
          return;
        }
        
        setPatient(foundPatient);
        
        // Get the medical record
        const record = await getMedicalRecord(foundPatient.id);
        if (record) {
          setMedicalRecord(record);
        } else {
          setError('Dossier médical non trouvé');
        }
      } catch (err) {
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !patient || !medicalRecord) {
    return (
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-red-50 p-4 rounded-md border border-red-200 mb-4">
          <p className="text-red-700">{error || 'Une erreur est survenue'}</p>
        </div>
        <Button
          variant="outline"
          icon={<ArrowLeft size={16} />}
          onClick={() => navigate('/dashboard')}
        >
          Retour au tableau de bord
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50">
      <PatientHeader patient={patient} />
      
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <Button
            variant="outline"
            size="sm"
            icon={<ArrowLeft size={16} />}
            onClick={() => navigate('/dashboard')}
          >
            Retour au tableau de bord
          </Button>
        </div>
        
        <div className="space-y-6">
          <MedicalTabs medicalRecord={medicalRecord} />
        </div>
      </div>
    </div>
  );
};

export default PatientRecord;