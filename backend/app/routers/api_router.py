import importlib

from fastapi import APIRouter

routers = [
    "auth",
    "classroom",
    "admin",
    "general",
    "comment",
    "post",
]

api_router = APIRouter(prefix="/api")


for api_route in routers:
    api = importlib.import_module(f"app.routers.{api_route}")
    api_router.include_router(api.router)
