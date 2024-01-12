from app.routers import admin, auth, classroom, teacher
from fastapi import APIRouter

api_router = APIRouter(prefix="/api", tags=["api"])

api_router.include_router(auth.router)
api_router.include_router(classroom.router)
api_router.include_router(teacher.router)
api_router.include_router(admin.router)
