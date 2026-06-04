from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_student_not_found():

    response = client.get(
        "/api/v1/etudiants/xxxxxxx"
    )

    assert response.status_code == 404