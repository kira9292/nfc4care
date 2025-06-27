@echo off
echo ========================================
echo    NFC4Care - Installation
echo ========================================
echo.

echo Vérification des prérequis...
echo.

echo Vérification de Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERREUR: Node.js n'est pas installé
    echo Veuillez installer Node.js depuis https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo Vérification de Java...
java -version
if %errorlevel% neq 0 (
    echo ERREUR: Java n'est pas installé
    echo Veuillez installer Java 17 ou supérieur
    pause
    exit /b 1
)

echo.
echo Vérification de Maven...
mvn --version
if %errorlevel% neq 0 (
    echo ERREUR: Maven n'est pas installé
    echo Veuillez installer Maven 3.6 ou supérieur
    pause
    exit /b 1
)

echo.
echo Installation des dépendances frontend...
cd frontend
npm install
if %errorlevel% neq 0 (
    echo ERREUR: Échec de l'installation des dépendances frontend
    pause
    exit /b 1
)

echo.
echo Configuration du frontend...
if not exist .env (
    copy env.example .env
    echo Fichier .env créé
)

echo.
echo Compilation du backend...
cd ..\backend
mvn clean compile
if %errorlevel% neq 0 (
    echo ERREUR: Échec de la compilation du backend
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installation terminée avec succès !
echo ========================================
echo.
echo Prochaines étapes :
echo 1. Configurez votre base de données MySQL
echo 2. Modifiez backend/src/main/resources/application.yml
echo 3. Lancez start-apps.bat pour démarrer les applications
echo.
pause 