# NFC4Care Frontend

Application React pour la gestion médicale avec authentification JWT et scanner NFC.

## 🚀 Démarrage rapide

### Prérequis

- **Node.js 18** ou supérieur
- **npm** ou **yarn**

### Installation

```bash
npm install
```

### Configuration

Copiez le fichier d'environnement :
```bash
cp env.example .env
```

Modifiez `.env` selon vos besoins :
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_DEV_MODE=true
VITE_ENABLE_MOCK_NFC=true
```

### Démarrage en développement

```bash
npm run dev
```

L'application sera accessible sur http://localhost:5173

## 📁 Structure du projet

```
frontend/
├── src/
│   ├── components/         # Composants réutilisables
│   │   ├── dashboard/      # Composants du dashboard
│   │   ├── layout/         # Layout principal
│   │   ├── nfc/           # Scanner NFC
│   │   ├── patient/       # Composants patient
│   │   └── ui/            # Composants UI de base
│   ├── context/           # Context React (Auth)
│   ├── pages/             # Pages de l'application
│   ├── services/          # Services API
│   └── types/             # Types TypeScript
├── public/                # Fichiers statiques
├── package.json           # Dépendances
├── vite.config.ts         # Configuration Vite
├── tailwind.config.js     # Configuration Tailwind
└── tsconfig.json          # Configuration TypeScript
```

## 🔧 Technologies utilisées

- **React 18** - Framework principal
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **Tailwind CSS** - Framework CSS
- **React Router** - Navigation
- **Lucide React** - Icônes
- **JWT** - Authentification

## 📱 Fonctionnalités

### Authentification
- Connexion/déconnexion avec JWT
- Persistance de session
- Protection des routes

### Dashboard
- Vue d'ensemble des patients
- Statistiques en temps réel
- Actions rapides

### Scanner NFC
- Simulation de scan NFC
- Recherche automatique de patients
- Navigation vers le dossier

### Gestion des patients
- Recherche de patients
- Affichage des dossiers médicaux
- Interface responsive

### Intégrité blockchain
- Affichage des hash de sécurité
- Vérification blockchain
- Métadonnées Cardano

## 🔗 API Backend

L'application communique avec le backend via les endpoints suivants :

### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion

### Patients
- `GET /api/patients` - Liste des patients
- `GET /api/patients/{id}` - Détails d'un patient
- `GET /api/patients/nfc/{numeroNFC}` - Patient par NFC
- `GET /api/patients/search?q={term}` - Recherche

### Blockchain
- `GET /api/blockchain/verify/{id}` - Vérifier l'intégrité

## 🧪 Tests

```bash
npm test
```

## 📦 Build pour production

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

## 🔧 Développement

### Ajout de nouveaux composants

1. Créez le composant dans `src/components/`
2. Ajoutez les types dans `src/types/`
3. Créez les tests si nécessaire
4. Documentez le composant

### Ajout de nouvelles pages

1. Créez la page dans `src/pages/`
2. Ajoutez la route dans `src/App.tsx`
3. Créez les services API si nécessaire
4. Testez la navigation

### Variables d'environnement

- `VITE_API_BASE_URL` - URL de l'API backend
- `VITE_DEV_MODE` - Mode développement
- `VITE_ENABLE_MOCK_NFC` - Activer la simulation NFC

## 🚨 Sécurité

- Tokens JWT stockés dans localStorage
- Validation des données côté client
- Protection des routes sensibles
- Gestion des erreurs d'API

## 📞 Support

Pour toute question ou problème :
- Vérifiez la console du navigateur
- Consultez les logs de l'API
- Vérifiez la configuration `.env`

---

**NFC4Care Frontend** - Interface utilisateur moderne et sécurisée 🎨 