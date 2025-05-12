import React from 'react';
import NFCScanner from '../components/nfc/NFCScanner';

const NFCScan: React.FC = () => {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Scan de carte patient</h1>
          <p className="mt-1 text-sm text-gray-500">
            Approchez la carte NFC du patient pour accéder à son dossier médical
          </p>
        </div>
        
        <NFCScanner />
        
        <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-700">
            <span className="font-medium">Info: </span>
            Cette démonstration simule un scan NFC. Dans un environnement réel, 
            elle utiliserait l'API Web NFC ou un scanner externe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NFCScan;