from fastapi import APIRouter, Query, HTTPException
import services.student_service as std

router = APIRouter()

@router.post("/api/v1/import/json")
def import_json():
    std.create_students_with_note()
        

@router.get("/api/v1/etudiants")
def get_students(page: int = Query(1, ge=1), limit: int = Query(5, ge=1, le=100), search: str | None = None, classe: str | None = None, source: str | None = None):
    return std.get_students_from_db(page=page, limit=limit, search=search, classe=classe, source=source)

@router.get("/api/v1/etudiant/{numero}")
def get_student(numero: str):
    student = std.get_single_student_from_db(numero)
    if not student:
        raise HTTPException(status_code = 404, detail = "Student not found")
    
    return student

@router.patch("/api/v1/etudiant/{numero}/archive")
def archive_student(numero : str):
    updated = std.archive_student(numero)

    if not updated:
        raise HTTPException(status_code = 404, detail = "Student not found")
    
    return {"message": "Student archived successfully"}


@router.patch("/api/v1/etudiant/{numero}/restore")
def restore_student(numero : str):
    updated = std.restore_student(numero)

    if not updated:
        raise HTTPException(status_code = 404, detail = "Student not found")
    
    return {"message": "Student restored successfully"}