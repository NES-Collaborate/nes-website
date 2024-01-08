from fastapi import APIRouter
from routers import admin, auth, classroom, teacher

api_router = APIRouter(prefix="/api", tags=["api"])

api_router.include_router(auth.router)
api_router.include_router(classroom.router)
api_router.include_router(teacher.router)
api_router.include_router(admin.router)
