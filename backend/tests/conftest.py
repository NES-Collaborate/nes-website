import pytest
from app import app
from fastapi.testclient import TestClient
from tests.utils import login_and_get_token


@pytest.fixture(scope="function")
def client():
    with TestClient(app) as c:
        yield c


@pytest.fixture(scope="function")
def client_with_token(client: TestClient):
    token = login_and_get_token(client, "00000000000", "admin")
    headers = {"Authorization": f"Bearer {token}"}
    client.headers = headers
    return client
