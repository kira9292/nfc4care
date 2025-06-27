# NFC4Care - Application de Gestion Médicale Sécurisée

## 🎯 Rôle et Objectif de l'Application

**NFC4Care** est une application de gestion médicale innovante qui combine **technologie NFC** et **blockchain Cardano** pour sécuriser et optimiser la gestion des dossiers médicaux.

### 🏥 Problématique Résolue

Dans le secteur médical, la **sécurité des données** et la **traçabilité** sont critiques :
- Protection des informations médicales sensibles
- Vérification de l'intégrité des dossiers
- Traçabilité des modifications
- Authentification sécurisée des professionnels
- Accès rapide aux informations patient

### 🔐 Solution NFC4Care

**NFC4Care** apporte une solution complète :

1. **🔍 Scanner NFC** : Identification rapide des patients via tags NFC
2. **⛓️ Blockchain Cardano** : Sécurisation et traçabilité des données médicales
3. **🔐 Authentification JWT** : Accès sécurisé pour les professionnels
4. **📊 Dashboard Intelligent** : Vue d'ensemble et statistiques
5. **📱 Interface Moderne** : Application web responsive et intuitive

### 🎯 Cas d'Usage Principaux

#### Pour les Professionnels de Santé
- **Connexion sécurisée** avec authentification JWT
- **Scanner NFC** pour identifier rapidement un patient
- **Consulter/Modifier** les dossiers médicaux
- **Traçabilité** de toutes les modifications via blockchain
- **Recherche avancée** de patients

#### Pour les Établissements Médicaux
- **Gestion centralisée** des dossiers patients
- **Sécurité renforcée** avec blockchain
- **Audit trail** complet des accès et modifications
- **Interface moderne** et intuitive
- **Intégration facile** avec les systèmes existants

## 🏗️ Architecture

- **Frontend** : React + TypeScript + Tailwind CSS
- **Backend** : Spring Boot + JPA + PostgreSQL + JWT
- **Blockchain** : Cardano via Blockfrost.io
- **Base de données** : PostgreSQL 15-alpine
- **Authentification** : JWT (JSON Web Tokens)

## 📁 Structure du projet

```
nfc4care/
├── frontend/              # Application React
│   ├── src/              # Code source React
│   ├── package.json      # Dépendances Node.js
│   ├── vite.config.ts    # Configuration Vite
│   └── README.md         # Documentation frontend
├── backend/              # Application Spring Boot
│   ├── src/              # Code source Java
│   ├── pom.xml           # Dépendances Maven
│   ├── database/         # Scripts SQL PostgreSQL
│   └── README.md         # Documentation backend
├── start-apps.bat        # Script de démarrage Windows
├── start-apps.sh         # Script de démarrage Linux/Mac
└── README.md             # Documentation principale
```

## 🚀 Démarrage rapide

### Prérequis

- **Java 17** ou supérieur
- **Node.js 18** ou supérieur
- **PostgreSQL 15** ou supérieur (ou Docker)
- **Maven 3.6** ou supérieur

### 1. Configuration de la base de données

**Option A : PostgreSQL local**
```sql
CREATE DATABASE nfc4care;
```

**Option B : Docker (recommandé)**
```bash
docker-compose up postgres
```

### 2. Configuration du backend

Modifiez `backend/src/main/resources/application.yml` :
```yaml
spring:
  datasource:
    username: nfc4care
    password: nfc4care

blockfrost:
  api:
    key: VOTRE_CLE_BLOCKFROST_API
```

### 3. Configuration du frontend

Copiez le fichier d'environnement :
```bash
cd frontend
cp env.example .env
```

### 4. Démarrage des applications

#### Option A : Script automatique (recommandé)

**Windows :**
```bash
start-apps.bat
```

**Linux/Mac :**
```bash
chmod +x start-apps.sh
./start-apps.sh
```

#### Option B : Docker Compose (recommandé pour production)
```bash
docker-compose up --build
```

#### Option C : Démarrage manuel

**Backend :**
```bash
cd backend
./start.sh  # Linux/Mac
# ou
start.bat   # Windows
```

**Frontend :**
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Accès aux applications

- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:8080/api
- **Base de données** : localhost:5432

## 🔐 Authentification

**Utilisateur par défaut :**
- **Email** : `doctor@example.com`
- **Mot de passe** : `password`

## 📱 Fonctionnalités Principales

### 🔍 Scanner NFC
- **Identification rapide** des patients via tags NFC
- **Simulation NFC** en mode développement
- **Intégration** avec les dossiers médicaux

### ⛓️ Blockchain Cardano
- **Sécurisation** des données médicales
- **Traçabilité** complète des modifications
- **Vérification d'intégrité** des dossiers
- **Métadonnées sécurisées** sur Cardano

### 📊 Dashboard Médical
- **Statistiques** en temps réel
- **Patients récents**
- **Alertes** et notifications
- **Interface** intuitive et moderne

### 👥 Gestion des Patients
- **Recherche avancée** de patients
- **Dossiers médicaux** complets
- **Historique** des consultations
- **Informations** personnelles sécurisées

### 🔐 Sécurité
- **Authentification JWT** sécurisée
- **Rôles** et permissions
- **Chiffrement** des données sensibles
- **Audit trail** complet

## 🔧 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion sécurisée
- `POST /api/auth/logout` - Déconnexion

### Patients
- `GET /api/patients` - Liste des patients
- `GET /api/patients/{id}` - Détails d'un patient
- `GET /api/patients/nfc/{numeroNFC}` - Patient par NFC
- `GET /api/patients/search?q={term}` - Recherche avancée
- `POST /api/patients` - Créer un patient
- `PUT /api/patients/{id}` - Modifier un patient

### Blockchain
- `GET /api/blockchain/verify/{id}` - Vérifier l'intégrité

## 🗄️ Structure de la base de données

### Tables principales
- **professionnels** - Professionnels de santé authentifiés
- **patients** - Informations patients avec tags NFC
- **dossiers_medicaux** - Dossiers médicaux sécurisés
- **consultations** - Historique des consultations

### Données de test
Le script d'initialisation crée automatiquement :
- 1 professionnel de santé par défaut
- 4 patients de test avec dossiers médicaux
- Tags NFC de test pour démonstration

## 🔗 Intégration Blockchain Cardano

### Fonctionnement
1. **Génération de hash** SHA-256 du contenu médical
2. **Transaction Cardano** via Blockfrost API
3. **Métadonnées** : `{patient_id, action, hash, author_id, timestamp}`
4. **Stockage** du hash de transaction en base
5. **Vérification** d'intégrité en temps réel

### Avantages de Cardano
- **Sécurité** : Preuve de participation (PoS)
- **Durabilité** : Blockchain permanente
- **Interopérabilité** : Standards ouverts
- **Évolutivité** : Réseau performant

### Configuration Blockfrost
1. Créez un compte sur [Blockfrost.io](https://blockfrost.io)
2. Générez une clé API pour le réseau Cardano mainnet
3. Ajoutez la clé dans `application.yml`

## 🧪 Tests

### Frontend
```bash
cd frontend
npm test
```

### Backend
```bash
cd backend
mvn test
```

## 🚨 Sécurité en production

1. **Changer la clé JWT** dans `application.yml`
2. **Configurer HTTPS** avec certificats SSL
3. **Limiter les origines CORS** strictement
4. **Configurer un firewall** approprié
5. **Sauvegarder régulièrement** la base de données
6. **Monitorer les logs** et accès
7. **Audit de sécurité** régulier

## 🔧 Développement

### Ajout de nouvelles fonctionnalités

1. **Backend** : Créer entité → Repository → Service → Controller
2. **Frontend** : Créer composant → Service API → Page
3. **Tests** : Tests unitaires et d'intégration
4. **Blockchain** : Intégrer les nouvelles données

### Variables d'environnement

**Frontend** : `frontend/.env`
```
VITE_API_BASE_URL=http://localhost:8080/api
VITE_DEV_MODE=true
VITE_ENABLE_MOCK_NFC=true
```

**Backend** : `backend/src/main/resources/application.yml`
```yaml
spring:
  profiles:
    active: dev
```

## 📞 Support et Contribution

Pour toute question ou problème :
- Vérifiez les logs de l'application
- Consultez la documentation Blockfrost
- Vérifiez la configuration PostgreSQL
- Consultez les issues GitHub

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

**NFC4Care** - Sécuriser la gestion médicale avec la blockchain Cardano 🏥🔗⛓️

*Une solution innovante pour la sécurité et la traçabilité des données médicales.*
