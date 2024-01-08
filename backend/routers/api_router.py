from fastapi import APIRouter
from routers import auth, teacher

from backend.routers import classroom

api_router = APIRouter(prefix="/api", tags=["api"])

api_router.include_router(auth.router)
api_router.include_router(classroom.router)
api_router.include_router(teacher.router)
