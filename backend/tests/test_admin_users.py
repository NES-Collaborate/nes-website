from datetime import datetime

from fastapi.testclient import TestClient


def test_create_and_delete_admin_with_credentials_return_new_user(client_with_token: TestClient):
    """" 
    Verifica se o administrador pode criar um usuário com credenciais corretas.
    
    Este teste verifica se o sistema retorna um status 201 e a mensagem 
    de sucesso apropriada quando um administrador cria um usuário com 
    credenciais corretas.
    """
    data_user = {
        "name": "admin",
        "type": "admin",
        "cpf": "11111111111",
        "birth": "01/01/2000",
        "password": "admin",
    }
    response = client_with_token.post("/api/admin/users", json=data_user)
    assert response.status_code == 201
    response_data = response.json()
    assert "user" in response_data
    assert response_data["user"]["name"] == data_user["name"]
    assert response_data["user"]["type"] == data_user["type"]
    assert response_data["user"]["cpf"] == data_user["cpf"]
    
    # Ajusta apenas a data no formato '01/01/2000' para '2000-01-01'
    adjusted_birth_date = datetime.strptime(data_user["birth"], "%d/%m/%Y").strftime("%Y-%m-%d")
    assert response_data["user"]["birth"] == adjusted_birth_date

    response = client_with_token.delete(f"/api/admin/users/delete-hard/{response_data['user']['cpf']}")
    print( data_user['cpf'] )
    assert response.json()["message"] == f"Usuário com cpf {data_user['cpf']} deletado permanentemente"