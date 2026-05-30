# Student Management Web System

A modern student management web application built with **FastAPI**, **PostgreSQL**, and **Vanilla JavaScript**.
The project combines backend API development, SQL database design, frontend integration, and data visualization into a complete full-stack application.

---

# Features

## Student Management
- Display students with pagination
- Search by:
  - student number
  - code
  - first name
  - last name
- Filter by:
  - class
  - source (DB / JSON)
  - validity
- Add new students
- Edit existing students
- Archive and restore students

---

## Smart Data Loading
The application uses two data sources:

### Primary Source
- PostgreSQL database

### Secondary Source
- `valides.json`

If the database does not contain enough records, the system automatically completes the result using JSON data.

Each row indicates its origin:
- `DB`
- `JSON`

---

## Dashboard & Analytics
Interactive dashboard built with **Chart.js**:
- Total students
- Valid / invalid data
- Archived students
- Data source distribution
- Students per class
- Top 10 averages
- Average per class

---

## JSON → PostgreSQL Import
- Select one or multiple JSON rows
- Import into PostgreSQL
- Duplicate detection using student number
- Imported rows become editable

---

# Tech Stack

## Backend
- Python
- FastAPI
- Pydantic
- PostgreSQL
- psycopg
- Raw SQL

## Frontend
- HTML
- CSS
- JavaScript
- Fetch API

## Visualization
- Chart.js

## Tools
- Linux
- Bash
- Git & GitHub

---

# Project Architecture

```text
student-management-web-app/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   ├── services/
│   │   ├── database/
│   │   ├── schemas/
│   │   ├── utils/
│   │   └── data/
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── pages/
│   ├── css/
│   ├── js/
│   └── assets/
│
├── sql/
│  
├── scripts/
|
|── tests/
│
├── README.md
└── docker-compose.yml
```
---

# Application Architecture
```
Frontend (HTML/CSS/JS)
            │
            ▼
      FastAPI REST API
            │
            ▼
 Business Logic Services
            │
     ┌──────┴──────┐
     ▼             ▼
PostgreSQL      JSON Loader
```
---

# Database Design
Main entities:

- Student
- Class
- Subject
- Grade
- Archive

The database uses:

- foreign keys
- indexes
- triggers
- constraints
- pagination queries
  
---

#   API Endpoints
##  Students
```
GET    /students
POST   /students
PUT    /students/{id}
DELETE /students/{id}
```
##  Dashboard
```
GET /dashboard/stats
GET /dashboard/top-students
```
##  Archives
```
GET  /archives
POST /archives/{id}/restore
```
##  Import
```
POST /import/json  
```
---

# Installation
##  1. Clone the repository
```
git clone https://github.com/your-username/student-management.git
cd student-management
```

##  2. Create virtual environment
```
python -m venv venv
source venv/bin/activate
```

##  3. Install dependencies
```
pip install -r backend/requirements.txt
```

##  4. Configure environment variables

Create a `.env` file:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=student_db
DB_USER=postgres
DB_PASSWORD=password
```

##  5. Create database schema
```
psql -U postgres -d student_db -f sql/schema.sql
##  6. Start the backend server
uvicorn app.main:app --reload
```

##  7. Open frontend

Open:

```
frontend/pages/index.html
```

---


# Example Workflow
```
User opens application
        ↓
Frontend sends HTTP request
        ↓
FastAPI receives request
        ↓
Service layer processes logic
        ↓
PostgreSQL queried
        ↓
JSON used if necessary
        ↓
Response returned as JSON
        ↓
Frontend renders data
```
---

# Learning Objectives

This project demonstrates:

- REST API development
- PostgreSQL database design
- Raw SQL queries
- Backend/frontend communication
- Data validation
- Pagination systems
- Data visualization
- Software architecture
- Full-stack application design

---

# Future Improvements
- Authentication & authorization
- Docker deployment
- CI/CD pipeline
- Unit testing
- Role management
- Export to PDF/Excel
- WebSocket real-time updates

---

#  Screenshots
##  Dashboard

Add dashboard screenshot here

##  Student Table

Add student table screenshot here

---

# Author

Developed by @yba01.

---

# License

This project is licensed under the MIT License.