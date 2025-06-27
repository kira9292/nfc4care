# NFC4Care Backend

Backend sécurisé Spring Boot pour l'application NFC4Care - Gestion médicale avec intégration blockchain Cardano.

## 🚀 Fonctionnalités

- **Authentification JWT** sécurisée pour les professionnels de santé
- **Gestion des patients** avec recherche par NFC
- **Dossiers médicaux** avec historique complet
- **Consultations** avec prescriptions et diagnostics
- **Intégration blockchain Cardano** via Blockfrost.io
- **Vérification d'intégrité** des données médicales
- **API REST** complète et documentée

## 🛠️ Technologies

- **Spring Boot 3.2.0** - Framework principal
- **Spring Security** - Authentification et autorisation
- **Spring Data JPA** - Persistance des données
- **MySQL 8.0** - Base de données
- **JWT** - Tokens d'authentification
- **WebClient** - Intégration API Blockfrost
- **Lombok** - Réduction du boilerplate
- **Maven** - Gestion des dépendances

## 📋 Prérequis

- Java 17 ou supérieur
- MySQL 8.0 ou supérieur
- Maven 3.6 ou supérieur
- Clé API Blockfrost (optionnelle pour les tests)

## 🔧 Configuration

### 1. Base de données

Créez une base de données MySQL :

```sql
CREATE DATABASE nfc4care CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Configuration application.yml

Modifiez `src/main/resources/application.yml` :

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/nfc4care?useSSL=false&serverTimezone=UTC
    username: votre_username
    password: votre_password

blockfrost:
  api:
    key: VOTRE_CLE_BLOCKFROST_API
```

### 3. Clé API Blockfrost

1. Créez un compte sur [Blockfrost.io](https://blockfrost.io)
2. Générez une clé API pour le réseau Cardano mainnet
3. Remplacez `YOUR_BLOCKFROST_API_KEY_HERE` dans `application.yml`

## 🚀 Installation et démarrage

### 1. Cloner le projet

```bash
git clone <repository-url>
cd nfc4care/backend
```

### 2. Compiler le projet

```bash
mvn clean compile
```

### 3. Lancer l'application

```bash
mvn spring-boot:run
```

L'application sera accessible sur `http://localhost:8080/api`

## 📚 API Endpoints

### Authentification

- `POST /api/auth/login` - Connexion professionnel
- `POST /api/auth/logout` - Déconnexion

### Patients

- `GET /api/patients` - Liste tous les patients
- `GET /api/patients/{id}` - Détails d'un patient
- `GET /api/patients/nfc/{numeroNFC}` - Patient par NFC
- `GET /api/patients/search?q={term}` - Recherche patients
- `POST /api/patients` - Créer un patient
- `PUT /api/patients/{id}` - Modifier un patient
- `DELETE /api/patients/{id}` - Supprimer un patient

### Blockchain

- `GET /api/blockchain/verify/{id}` - Vérifier l'intégrité

## 🔐 Sécurité

### Authentification

L'API utilise JWT (JSON Web Tokens) pour l'authentification :

1. **Connexion** : `POST /api/auth/login`
   ```json
   {
     "email": "doctor@example.com",
     "password": "password"
   }
   ```

2. **Utilisation du token** : Incluez le header `Authorization: Bearer <token>`

### Utilisateur par défaut

Un professionnel de santé par défaut est créé automatiquement :
- **Email** : `doctor@example.com`
- **Mot de passe** : `password`

## 🔗 Intégration Blockchain

### Fonctionnement

1. **Génération de hash** : SHA-256 du contenu médical
2. **Transaction Cardano** : Envoi via Blockfrost API
3. **Métadonnées** : `{patient_id, action, hash, author_id, timestamp}`
4. **Stockage** : Hash de transaction dans la base de données

### Vérification d'intégrité

La route `/api/blockchain/verify/{id}` permet de vérifier l'intégrité des données en comparant le hash stocké avec celui de la blockchain.

## 🗄️ Structure de la base de données

### Tables principales

- **professionnels** - Professionnels de santé
- **patients** - Informations patients
- **dossiers_medicaux** - Dossiers médicaux
- **consultations** - Historique des consultations

### Champs blockchain

- `hash_contenu` - Hash SHA-256 du contenu
- `blockchain_txn_hash` - Hash de la transaction Cardano

## 🧪 Tests

### Tests unitaires

```bash
mvn test
```

### Tests d'intégration

```bash
mvn verify
```

## 📝 Logs

Les logs sont configurés pour afficher :
- Requêtes HTTP
- Authentification
- Erreurs blockchain
- Opérations de base de données

## 🔧 Développement

### Structure du projet

```
src/main/java/com/nfc4care/
├── config/          # Configurations Spring
├── controller/      # Contrôleurs REST
├── dto/            # Data Transfer Objects
├── entity/         # Entités JPA
├── repository/     # Repositories Spring Data
├── security/       # Configuration sécurité
└── service/        # Services métier
```

### Ajout de nouvelles fonctionnalités

1. Créer l'entité JPA
2. Créer le repository
3. Créer le service métier
4. Créer le contrôleur REST
5. Ajouter les tests

## 🚨 Sécurité en production

1. **Changer la clé JWT** dans `application.yml`
2. **Configurer HTTPS**
3. **Limiter les origines CORS**
4. **Configurer un firewall**
5. **Sauvegarder régulièrement la base de données**
6. **Monitorer les logs**

## 📞 Support

Pour toute question ou problème :
- Créez une issue sur GitHub
- Consultez la documentation Blockfrost
- Vérifiez les logs de l'application

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails. 