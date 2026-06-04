from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_get_students():

    response = client.get(
        "/api/v1/etudiants"
    )

    assert response.status_code == 200