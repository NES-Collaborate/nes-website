from fastapi.testclient import TestClient

from .utils import login_and_get_token


# Teste para verificar se a API de login retorna um status 200 para credenciais válidas
def test_login_success(client: TestClient):
    response = client.post(
        "/api/login", data={"username": "00000000000", "password": "admin"}
    )
    assert response.status_code == 200


# Teste para assegurar que o sistema rejeita logins com uma senha incorreta
def test_login_wrong(client: TestClient):
    response = client.post(
        "api/login", data={"username": "00000000000", "password": "wrong"}
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "CPF ou senha incorretos"}


# Teste para verificar se a API de logout retorna um status 200
def test_logout(client: TestClient):
    response = client.get("/api/logout")
    assert response.status_code == 200
    assert response.json() == {"message": "logout realizado"}


# Teste para verificar se o busca de um user por cpf retorna um status 200
def test_get_user_success(client: TestClient):
    # Passo 1: Login e obtenção do token

    token = login_and_get_token(client, "00000000000", "admin")
    # Passo 2: Acessar a rota /me com o token de autenticação
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/me", headers=headers)
    user_data = response.json()
    # Passo 3: Verificações finais
    assert response.status_code == 200
    assert user_data["name"] == "Admin"
    assert user_data["cpf"] == "00000000000"
    assert user_data["type"] == "admin"

    # Verificar se os campos relacionais existem (exemplo: 'emails', 'phones')
    assert "emails" in user_data
    assert "phones" in user_data
