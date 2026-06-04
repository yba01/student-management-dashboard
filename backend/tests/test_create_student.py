from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_create_student():

    payload = {
        "numero": "12345",
        "prenom": "Moussa",
        "nom": "Diop",
        "classe": "3e A"
    }

    response = client.post(
        "/api/v1/etudiants",
        json=payload
    )

    assert response.status_code == 422