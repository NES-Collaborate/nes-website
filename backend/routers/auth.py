from fastapi import APIRouter, Depends


router = APIRouter()

@router.get("/csrftoken")
async def get_csrftoken():
    return

@router.post("/login")
async def login():
    return

@router.get("/me")
async def get_user():
    return

