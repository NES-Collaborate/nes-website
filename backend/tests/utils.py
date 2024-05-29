from fastapi.testclient import TestClient
import pytest
def login_and_get_token(client: TestClient, username: str, password: str):
    response = client.post(
        "/api/login", data={"username": username, "password": password}
    )
    assert response.status_code == 200
    token = response.json()[
        "access_token"
    ]  # Ajuste de acordo com a estrutura da sua resposta
    return token

@pytest.fixture
def auth_token(client: TestClient):
    return login_and_get_token(client, "00000000000", "admin")