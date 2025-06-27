import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';

const NFCScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('Approchez la carte du patient');
  const navigate = useNavigate();

  useEffect(() => {
    if (isScanning) {
      setScanStatus('scanning');
      setMessage('Recherche de carte NFC...');
      
      // Simuler le scan NFC avec l'API backend
      const simulateScan = async () => {
        try {
          // Utiliser un ID NFC de test (dans un vrai scanner, ceci viendrait du hardware)
          const nfcId = 'nfc-12345';
          const response = await apiService.getPatientByNFC(nfcId);
          
          if (response.success && response.data) {
            setScanStatus('success');
            setMessage(`Carte détectée pour ${response.data.prenom} ${response.data.nom}`);
            // Attendre un moment avant de naviguer
            setTimeout(() => {
              navigate(`/patient/${response.data.id}`);
            }, 1500);
          } else {
            setScanStatus('error');
            setMessage('Carte non reconnue. Veuillez réessayer.');
            setTimeout(() => setIsScanning(false), 2000);
          }
        } catch (error) {
          setScanStatus('error');
          setMessage('Erreur de lecture. Veuillez réessayer.');
          setTimeout(() => setIsScanning(false), 2000);
        }
      };
      
      simulateScan();
    } else {
      setScanStatus('idle');
      setMessage('Approchez la carte du patient');
    }
  }, [isScanning, navigate]);

  const handleScanStart = () => {
    setIsScanning(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col items-center">
          <div 
            className={`
              w-32 h-32 rounded-full flex items-center justify-center mb-6
              ${scanStatus === 'idle' ? 'bg-blue-100' : ''}
              ${scanStatus === 'scanning' ? 'bg-blue-100 animate-pulse' : ''}
              ${scanStatus === 'success' ? 'bg-green-100' : ''}
              ${scanStatus === 'error' ? 'bg-red-100' : ''}
            `}
          >
            <RefreshCw
              size={48}
              className={`
                ${scanStatus === 'idle' ? 'text-blue-600' : ''}
                ${scanStatus === 'scanning' ? 'text-blue-600 animate-spin' : ''}
                ${scanStatus === 'success' ? 'text-green-600' : ''}
                ${scanStatus === 'error' ? 'text-red-600' : ''}
              `}
            />
          </div>
          <h2 className="text-xl font-semibold text-center mb-2">Scanner NFC</h2>
          <p className="text-gray-600 text-center mb-6">{message}</p>
          
          {!isScanning && (
            <button
              onClick={handleScanStart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Commencer le scan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFCScanner;