from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from schemas.user import UserIn, UserOut
from services.db import get_session
from services.user import UserService
from sqlalchemy.orm import Session

router = APIRouter()


@router.get("/login", status_code=status.HTTP_200_OK)
async def get_token(form_data: OAuth2PasswordRequestForm = Depends(),
                    session: Session = Depends(get_session)):
    return await UserService.login(form_data, session)


@router.get("/me", status_code=status.HTTP_200_OK)
async def get_user(current_user=Depends(UserService.get_current_user)):
    return UserOut.model_validate(current_user, from_attributes=True)
