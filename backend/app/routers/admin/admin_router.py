import importlib

from fastapi import APIRouter

router = APIRouter(prefix="/admin", tags=["admin"])

for api_route in ["finance", "property", "users", "classroom"]:
    api = importlib.import_module(f"app.routers.admin.{api_route}")
    router.include_router(api.router)
