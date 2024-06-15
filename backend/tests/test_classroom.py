from fastapi.testclient import TestClient

from .utils import login_and_get_token


def test_get_subjects_success(client: TestClient):
    token = login_and_get_token(client, "00000000000", "admin")
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/classroom/subjects", headers=headers)
    print(token)
    assert response.status_code == 200
