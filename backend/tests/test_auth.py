from fastapi.testclient import TestClient


def test_login_with_wrong_credentials_returns_error(client: TestClient):
    """
    Verifica se o login falha quando são fornecidas credenciais incorretas.
    
    Este teste verifica se o sistema retorna um status 400 e a mensagem 
    de erro apropriada quando um usuário tenta fazer login com um CPF 
    e senha incorretos.
    """
    response = client.post("api/login",
                           data={
                               "username": "00000000000",
                               "password": "wrong"
                           })
    assert response.status_code == 400
    assert response.json()["detail"] == "CPF ou senha incorretos"



def test_logout_with_credentials_return_success(client_with_token: TestClient):
    """" 
    Verifica se o logout funciona com credenciais corretas.
    
    Este teste verifica se o sistema retorna um status 200 e a mensagem 
    de sucesso apropriada quando um usuário faz logout.
    """
    response = client_with_token.get("/api/logout")
    assert response.status_code == 200
    assert response.json()["message"] ==  "logout realizado"
