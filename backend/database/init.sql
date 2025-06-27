-- Script d'initialisation de la base de données NFC4Care pour PostgreSQL

-- Table des professionnels de santé
CREATE TABLE IF NOT EXISTS professionnels (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    specialite VARCHAR(100) NOT NULL,
    numero_rpps VARCHAR(20) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL DEFAULT 'MEDECIN',
    date_creation TIMESTAMP NOT NULL,
    derniere_connexion TIMESTAMP,
    actif BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE INDEX IF NOT EXISTS idx_email ON professionnels(email);
CREATE INDEX IF NOT EXISTS idx_rpps ON professionnels(numero_rpps);

-- Table des patients
CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY,
    numero_dossier VARCHAR(50) NOT NULL UNIQUE,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    date_naissance DATE NOT NULL,
    sexe VARCHAR(1) NOT NULL,
    adresse TEXT NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    numero_securite_sociale VARCHAR(15) NOT NULL UNIQUE,
    groupe_sanguin VARCHAR(5),
    numero_nfc VARCHAR(100) UNIQUE,
    date_creation TIMESTAMP NOT NULL,
    derniere_consultation TIMESTAMP,
    actif BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE INDEX IF NOT EXISTS idx_numero_dossier ON patients(numero_dossier);
CREATE INDEX IF NOT EXISTS idx_nss ON patients(numero_securite_sociale);
CREATE INDEX IF NOT EXISTS idx_nfc ON patients(numero_nfc);
CREATE INDEX IF NOT EXISTS idx_nom_prenom ON patients(nom, prenom);

-- Table des dossiers médicaux
CREATE TABLE IF NOT EXISTS dossiers_medicaux (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL UNIQUE,
    antecedents_medicaux TEXT,
    antecedents_chirurgicaux TEXT,
    antecedents_familiaux TEXT,
    traitements_en_cours TEXT,
    allergies TEXT,
    observations_generales TEXT,
    hash_contenu VARCHAR(64) NOT NULL,
    blockchain_txn_hash VARCHAR(255),
    date_creation TIMESTAMP NOT NULL,
    date_modification TIMESTAMP NOT NULL,
    professionnel_creation_id INTEGER NOT NULL,
    professionnel_modification_id INTEGER,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (professionnel_creation_id) REFERENCES professionnels(id),
    FOREIGN KEY (professionnel_modification_id) REFERENCES professionnels(id)
);
CREATE INDEX IF NOT EXISTS idx_patient_id ON dossiers_medicaux(patient_id);
CREATE INDEX IF NOT EXISTS idx_blockchain_hash ON dossiers_medicaux(blockchain_txn_hash);

-- Table des consultations
CREATE TABLE IF NOT EXISTS consultations (
    id SERIAL PRIMARY KEY,
    dossier_medical_id INTEGER NOT NULL,
    professionnel_id INTEGER NOT NULL,
    date_consultation TIMESTAMP NOT NULL,
    motif_consultation TEXT NOT NULL,
    examen_clinique TEXT,
    diagnostic TEXT,
    traitement_prescrit TEXT,
    ordonnance TEXT,
    observations TEXT,
    prochain_rdv TIMESTAMP,
    hash_contenu VARCHAR(64) NOT NULL,
    blockchain_txn_hash VARCHAR(255),
    date_creation TIMESTAMP NOT NULL,
    date_modification TIMESTAMP NOT NULL,
    FOREIGN KEY (dossier_medical_id) REFERENCES dossiers_medicaux(id) ON DELETE CASCADE,
    FOREIGN KEY (professionnel_id) REFERENCES professionnels(id)
);
CREATE INDEX IF NOT EXISTS idx_dossier_medical_id ON consultations(dossier_medical_id);
CREATE INDEX IF NOT EXISTS idx_professionnel_id ON consultations(professionnel_id);
CREATE INDEX IF NOT EXISTS idx_date_consultation ON consultations(date_consultation);
CREATE INDEX IF NOT EXISTS idx_blockchain_hash ON consultations(blockchain_txn_hash);

-- Insertion d'un professionnel de santé par défaut
INSERT INTO professionnels (
    email, password, nom, prenom, specialite, numero_rpps, role, date_creation, actif
) VALUES (
    'doctor@example.com',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'Dubois',
    'Martin',
    'Médecine générale',
    '12345678901',
    'MEDECIN',
    NOW(),
    TRUE
) ON CONFLICT (email) DO NOTHING;

-- Insertion de quelques patients de test
INSERT INTO patients (
    numero_dossier, nom, prenom, date_naissance, sexe, adresse, telephone, email, numero_securite_sociale, groupe_sanguin, numero_nfc, date_creation, actif
) VALUES 
('PA-20589', 'Laurent', 'Sophie', '1981-03-15', 'F', '123 Rue de la Paix, 75001 Paris', '0123456789', 'sophie.laurent@email.com', '123456789012345', 'A+', 'nfc-12345', NOW(), TRUE),
('PA-18754', 'Dupont', 'Marc', '1956-07-22', 'M', '456 Avenue des Champs, 75008 Paris', '0123456790', 'marc.dupont@email.com', '123456789012346', 'O+', 'nfc-67890', NOW(), TRUE),
('PA-21435', 'Moreau', 'Émilie', '1994-11-08', 'F', '789 Boulevard Saint-Germain, 75006 Paris', '0123456791', 'emilie.moreau@email.com', '123456789012347', 'B+', 'nfc-54321', NOW(), TRUE),
('PA-19876', 'Petit', 'Thomas', '1969-05-12', 'M', '321 Rue de Rivoli, 75001 Paris', '0123456792', 'thomas.petit@email.com', '123456789012348', 'AB+', 'nfc-09876', NOW(), TRUE)
ON CONFLICT (numero_dossier) DO NOTHING;

-- Insertion de dossiers médicaux de test
INSERT INTO dossiers_medicaux (
    patient_id, antecedents_medicaux, allergies, hash_contenu, date_creation, date_modification, professionnel_creation_id
) VALUES 
(1, 'Douleurs lombaires chroniques', 'Pénicilline (Modérée)', 'a1b2c3d4e5f6...', NOW(), NOW(), 1),
(2, 'Hypertension artérielle', 'Aucune', 'b2c3d4e5f6g7...', NOW(), NOW(), 1),
(3, 'Anxiété', 'Arachides (Sévère)', 'c3d4e5f6g7h8...', NOW(), NOW(), 1),
(4, 'Diabète type 2', 'Aucune', 'd4e5f6g7h8i9...', NOW(), NOW(), 1)
ON CONFLICT (patient_id) DO NOTHING; 