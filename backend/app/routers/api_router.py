from fastapi import APIRouter

from app.routers import auth, classroom, general, students, teacher
from app.routers.admin import admin_router

api_router = APIRouter(prefix="/api", tags=["api"])

api_router.include_router(auth.router)
api_router.include_router(classroom.router)
api_router.include_router(teacher.router)
api_router.include_router(admin_router.router)
api_router.include_router(general.router)
api_router.include_router(students.router)
