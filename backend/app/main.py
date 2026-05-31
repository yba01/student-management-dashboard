from fastapi import FastAPI 
from routes.students import router as student_router
from routes.dashboard import router as dashboard_router

app = FastAPI(
    title="Student Management API",
    version="1.0.0"
)
 

app.include_router(student_router)
app.include_router(dashboard_router)

@app.get("/")
def root():
    return {
        "message":"Hi baddy!!!"
    }

# health check
@app.get("/api/v1/health")   
def health_check():
    return {
        "status": "ok",
        "service": "student-management-api",
        "version": "1.0.0"
    }     


        
