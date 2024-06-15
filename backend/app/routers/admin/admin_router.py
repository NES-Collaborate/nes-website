from app.routers.admin import classroom, finance, property, users
from fastapi import APIRouter

router = APIRouter(prefix="/admin", tags=["admin"])

router.include_router(finance.router)
router.include_router(property.router)
router.include_router(users.router)
router.include_router(classroom.router)
