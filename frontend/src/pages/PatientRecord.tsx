import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PatientHeader from '../components/patient/PatientHeader';
import MedicalTabs from '../components/patient/MedicalTabs';
import Button from '../components/ui/Button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { apiService } from '../services/api';

interface Patient {
  id: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: string;
  numeroDossier: string;
  adresse: string;
  telephone: string;
  email?: string;
  groupeSanguin?: string;
}

interface MedicalRecord {
  id: string;
  patientId: string;
  antecedentsMedicaux?: string;
  antecedentsChirurgicaux?: string;
  antecedentsFamiliaux?: string;
  traitementsEnCours?: string;
  allergies?: string;
  observationsGenerales?: string;
  hashContenu: string;
  blockchainTxnHash?: string;
}

const PatientRecord: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // Récupérer les données du patient
        const patientResponse = await apiService.getPatientById(id);
        
        if (!patientResponse.success || !patientResponse.data) {
          setError('Patient non trouvé');
          setLoading(false);
          return;
        }
        
        setPatient(patientResponse.data);
        
        // Pour l'instant, on simule un dossier médical
        // En production, vous auriez un endpoint pour récupérer le dossier médical
        const mockMedicalRecord: MedicalRecord = {
          id: '1',
          patientId: id,
          antecedentsMedicaux: 'Aucun antécédent médical notable',
          allergies: 'Aucune allergie connue',
          hashContenu: 'abc123...',
          blockchainTxnHash: 'txn_hash_123'
        };
        
        setMedicalRecord(mockMedicalRecord);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
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