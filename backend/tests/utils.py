import pytest
from fastapi.testclient import TestClient




def login_and_get_token(client: TestClient, username: str, password: str):
    response = client.post("/api/login",
                           data={
                               "username": username,
                               "password": password
                           })
    assert response.status_code == 200
    token = response.json()["access_token"]
    return token
