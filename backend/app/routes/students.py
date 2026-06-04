from fastapi import APIRouter, Query, HTTPException
import app.services.student_service as std
from app.schema.student_schema import etudiant, updatetudiant

router = APIRouter()

@router.post("/api/v1/import/json")
def import_json():
    std.create_students_with_note()
    return {"message" : "data successfully importded in database"}
        

@router.get("/api/v1/etudiants")
def get_students(page: int | None = Query(None, ge=1), limit: int | None = Query(5, ge=1, le=100), numero: str | None = None, nom: str | None = None, code: str | None = None, classe: str | None = None, source: str | None = None):
    return std.get_students_from_db(page=page, limit=limit, numero=numero, nom=nom, code=code, classe=classe, source=source)

@router.get("/api/v1/etudiants/{numero}")
def get_student(numero: str):
    student = std.get_single_student_from_db(numero)
    if not student:
        raise HTTPException(status_code = 404, detail = "Student not found")
    
    return student

@router.patch("/api/v1/etudiants/{numero}/archive")
def archive_student(numero : str):
    updated = std.archive_student(numero)

    if not updated:
        raise HTTPException(status_code = 404, detail = "Student not found")
    
    return {"message": "Student archived successfully"}


@router.patch("/api/v1/etudiants/{numero}/restore")
def restore_student(numero : str):
    updated = std.restore_student(numero)

    if not updated:
        raise HTTPException(status_code = 404, detail = "Student not found")
    
    return {"message": "Student restored successfully"}

@router.post("/api/v1/etudiants")
def create_student(student: etudiant):
    std.create_student(student)
    return {"message": "Student succefully created"}

@router.patch("/api/v1/etudiants/{numero}")
def update_student(numero: str, payload: updatetudiant):
    updated = std.update_student(numero, payload)

    if not updated:
        raise HTTPException(status_code = 404, detail = "Student not found")
    
    return {"message": "Data updated successfully"}


