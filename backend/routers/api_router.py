from fastapi import APIRouter

from routers import auth, student, teacher

api_router = APIRouter(prefix="/api", tags=["api"])

api_router.include_router(auth.router)
api_router.include_router(student.router)
api_router.include_router(teacher.router)
