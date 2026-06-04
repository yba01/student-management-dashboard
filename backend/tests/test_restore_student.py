from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_restore_student():

    response = client.patch(
        "/api/v1/etudiants/LIHGFR0/restore"
    )

    assert response.status_code == 200