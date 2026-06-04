from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_get_student():

    response = client.get(
        "/api/v1/etudiants/LIHGFR0"
    )

    assert response.status_code == 200