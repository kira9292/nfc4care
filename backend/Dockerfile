# Dockerfile pour NFC4Care Backend
FROM openjdk:17-jdk-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier pom.xml
COPY pom.xml .

# Copier le wrapper Maven
COPY .mvn .mvn
COPY mvnw .

# Rendre le wrapper exécutable
RUN chmod +x mvnw

# Télécharger les dépendances
RUN ./mvnw dependency:go-offline -B

# Copier le code source
COPY src src

# Compiler l'application
RUN ./mvnw clean package -DskipTests

# Exposer le port
EXPOSE 8080

# Commande de démarrage
CMD ["java", "-jar", "target/nfc4care-backend-1.0.0.jar"] 