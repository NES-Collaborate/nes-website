from fastapi import APIRouter
from routers import auth

api_router = APIRouter(prefix="/api", tags=["api"])

api_router.include_router(auth.router)
