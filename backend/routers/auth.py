from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from models.user import User
from schemas.user import UserOut
from services.db import get_session
from services.settings import settings
from services.user import UserService
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/login", status_code=status.HTTP_200_OK)
async def get_token(form_data: OAuth2PasswordRequestForm = Depends(),
                    session: Session = Depends(get_session)):
    return await UserService.login(form_data, session)


@router.get("/me", status_code=status.HTTP_200_OK)
async def get_user(current_user: User = Depends(UserService.get_current_user)):
    #return current_user.__dict__
    return UserOut.model_validate(current_user, from_attributes=True)


@router.get("/logout", status_code=status.HTTP_200_OK)
async def logout():
    response = JSONResponse(status_code=status.HTTP_200_OK,
                            content={"message": "logout realizado"})

    response.set_cookie(key="_token", value="", path=settings.COOKIE_PATH)

    return response
