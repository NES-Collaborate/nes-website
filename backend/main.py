import models.base
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.api_router import api_router
from services.db import create_default_user, engine
from services.settings import settings

app = FastAPI(title="GAP Project", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.base.BaseTable.metadata.create_all(bind=engine)
create_default_user()

app.include_router(api_router)
