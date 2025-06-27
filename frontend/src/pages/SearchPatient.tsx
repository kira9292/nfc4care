import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Search, User } from 'lucide-react';
import { apiService } from '../services/api';

interface Patient {
  id: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  numeroDossier: string;
}

const SearchPatient: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setLoading(true);

    if (!searchTerm.trim()) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    try {
      const response = await apiService.searchPatients(searchTerm);
      if (response.success && response.data) {
        setSearchResults(response.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dateNaissance: string) => {
    const birthDate = new Date(dateNaissance);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Rechercher un patient</h1>
        
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <form onSubmit={handleSearch}>
              <div className="flex gap-3">
                <div className="flex-grow">
                  <Input
                    type="text"
                    placeholder="Nom, prénom ou numéro de dossier du patient"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={<Search size={20} />}
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Recherche...' : 'Rechercher'}
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        {hasSearched && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-semibold">
                Résultats ({searchResults.length})
              </h2>
            </div>
            
            {loading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Recherche en cours...</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">Aucun patient trouvé pour "{searchTerm}"</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {searchResults.map(patient => (
                  <li key={patient.id} className="px-4 py-4 hover:bg-gray-50 transition-colors">
                    <button 
                      className="w-full text-left"
                      onClick={() => navigate(`/patient/${patient.id}`)}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {patient.prenom} {patient.nom}
                          </div>
                          <div className="text-sm text-gray-500">
                            {calculateAge(patient.dateNaissance)} ans · Dossier {patient.numeroDossier}
                          </div>
                        </div>
                        <div className="ml-auto">
                          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            Voir dossier
                          </span>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPatient;