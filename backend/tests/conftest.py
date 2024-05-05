import pytest
from app import app
from fastapi.testclient import TestClient


@pytest.fixture(scope="function")
def client():
    with TestClient(app) as c:
        yield c
