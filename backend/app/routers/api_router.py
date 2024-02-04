from app.routers import auth, classroom, teacher
from app.routers.admin import admin_router
from fastapi import APIRouter

api_router = APIRouter(prefix="/api", tags=["api"])

api_router.include_router(auth.router)
api_router.include_router(classroom.router)
api_router.include_router(teacher.router)
api_router.include_router(admin_router.router)
