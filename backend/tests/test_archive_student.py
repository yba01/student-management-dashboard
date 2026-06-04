from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_archive_student():

    response = client.patch(
        "/api/v1/etudiants/LIHGFR0/archive"
    )

    assert response.status_code == 200