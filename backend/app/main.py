from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.api_router import api_router
from app.services.settings import settings

app = FastAPI(title="GAP Project")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
