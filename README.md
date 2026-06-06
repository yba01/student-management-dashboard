[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/yba01/student-management-dashboard/blob/main/README.en.md)

# Student Management Dashboard

Application web full-stack permettant de gérer des étudiants, leurs notes et leurs statistiques académiques.

Développée avec **FastAPI**, **PostgreSQL** et **JavaScript Vanilla**, l'application offre des fonctionnalités de gestion des étudiants, de visualisation de données, de recherche avancée et de statistiques académiques.

---

## Présentation

Student Management Dashboard simule un système de gestion scolaire moderne.

L'application permet de :

- Importer des étudiants depuis un fichier JSON
- Créer, modifier et consulter des étudiants
- Archiver et restaurer des étudiants
- Rechercher et filtrer les données
- Visualiser des statistiques académiques
- Analyser les performances par classe
- Identifier les meilleurs étudiants

Le projet est conçu selon une architecture claire séparant le frontend, le backend, la couche métier, l'accès aux données et les tests.

---

## Fonctionnalités

### Gestion des étudiants

- Import des données depuis `valid.json`
- Création d'étudiants
- Modification des informations
- Archivage d'étudiants
- Restauration d'étudiants archivés
- Consultation des détails d'un étudiant

### Recherche et Navigation

- Recherche par mot-clé
- Filtrage par classe
- Filtrage par source de données
- Défilement infini (Infinite Scroll) avec Intersection Observer

### Tableau de bord et statistiques

- Nombre total d'étudiants
- Nombre d'étudiants provenant de PostgreSQL
- Nombre d'étudiants provenant du fichier JSON
- Nombre d'étudiants actifs
- Nombre d'étudiants archivés
- Répartition des étudiants par classe
- Top 10 des meilleures moyennes
- Moyenne générale par classe

### Qualité logicielle

- Tests automatisés avec Pytest
- Validation des données avec Pydantic
- Architecture API REST

---

## Technologies utilisées

### Backend

- FastAPI
- PostgreSQL
- Pydantic
- Psycopg
- Pytest

### Frontend

- HTML5
- CSS3
- JavaScript Vanilla
- Intersection Observer API
- Chart.js

---

## Architecture du projet

```text
student-management-dashboard/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── database/
│   │   ├── schema/
│   │   ├── utils/
│   │   └── main.py
│   │
│   └── tests/
│
├── frontend/
|   ├── css/
│   ├── js/
│   └── pages/
│
├── sql/
│   └── schema.sql
│
├── script/
│
├── docs/
│   ├── students.png
│   ├── dashboard.png
│   └── archive.png
│
├── requirements.txt
├── .env.example
└── README.md
```

---

## Base de données

Le projet utilise PostgreSQL avec deux tables principales :

### etudiants

Contient les informations administratives des étudiants.

### notes

Contient les notes associées aux étudiants.

---

## Endpoints API

### Gestion des étudiants

| Méthode | Endpoint | Description |
|----------|------------|-------------|
| POST | `/api/v1/import/json` | Importer les données JSON |
| GET | `/api/v1/etudiants` | Liste des étudiants |
| GET | `/api/v1/etudiants/{numero}` | Détail d'un étudiant |
| POST | `/api/v1/etudiants` | Créer un étudiant |
| PATCH | `/api/v1/etudiants/{numero}` | Modifier un étudiant |
| PATCH | `/api/v1/etudiants/{numero}/archive` | Archiver un étudiant |
| PATCH | `/api/v1/etudiants/{numero}/restore` | Restaurer un étudiant |

### Statistiques

| Méthode | Endpoint | Description |
|----------|------------|-------------|
| GET | `/api/v1/stats/globales` | Statistiques globales |
| GET | `/api/v1/stats/top-moyeennes` | Top 10 des étudiants |
| GET | `/api/v1/stats/classe` | Statistiques par classe |

---

## Captures d'écran

### Tableau de bord

![Dashboard](docs/dashboard.png)

### Gestion des étudiants

![Students](docs/students.png)

### Gestion des archives

![Archive](docs/archive.png)

---

## Installation

### Cloner le dépôt

```bash
git clone https://github.com/yba01/student-management-dashboard.git

cd student-management-dashboard
```

---

### Configuration du Backend

Créer un environnement virtuel :

```bash
python -m venv venv
```

Activer l'environnement :

Linux / macOS :

```bash
source venv/bin/activate
```

Windows :

```bash
venv\Scripts\activate
```

Installer les dépendances :

```bash
pip install -r requirements.txt
```

---

### Variables d'environnement

Créer un fichier `.env` à partir du fichier `.env.example`.

```env
DB_HOST=localhost
DB_NAME=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe
```

---

### Initialisation de la base de données

Créer la base PostgreSQL puis exécuter :

```bash
psql -U postgres -d db -f sql/schema.sql
```

---

### Lancer le Backend

```bash
uvicorn app.main:app --reload
```

API disponible sur :

```text
http://localhost:8000
```

Documentation Swagger :

```text
http://localhost:8000/docs
```

---

### Lancer le Frontend

```bash
cd frontend

python -m http.server 5500
```

Application disponible sur :

```text
http://localhost:5500
```

---

## Tests

Exécuter tous les tests :

```bash
pytest
```

Tests actuellement implémentés :

- Récupération des étudiants
- Récupération d'un étudiant
- Étudiant inexistant
- Création d'un étudiant
- Archivage d'un étudiant
- Restauration d'un étudiant

---

## Principes de conception

- Architecture claire et modulaire
- Séparation des responsabilités
- Couche métier dédiée (Services)
- API RESTful
- Configuration via variables d'environnement
- Validation des données
- Tests automatisés

---

## Améliorations futures

- Authentification et gestion des rôles
- Déploiement avec Docker
- Pipeline CI/CD
- Export Excel / PDF
- Analyses statistiques avancées
- Gestion multi-utilisateurs

---

## Auteur

**Yba (yba01)**

GitHub : https://github.com/yba01

---

## Compétences démontrées

Ce projet met en évidence :

- Développement Backend avec FastAPI
- Conception et manipulation de bases PostgreSQL
- Requêtes SQL et agrégations
- Conception d'API REST
- Validation de données avec Pydantic
- Tests automatisés avec Pytest
- Développement Frontend en JavaScript Vanilla
- Visualisation et analyse de données
- Organisation professionnelle d'un projet logiciel