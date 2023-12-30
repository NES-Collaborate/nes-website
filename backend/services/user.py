from datetime import datetime, timedelta

from daos import user
from fastapi import Depends, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt
from services.db import get_session
from sqlalchemy.orm import Session

from .settings import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")


class UserService:

    @staticmethod
    async def authenticate_user(cpf: str, password: str, session: Session):
        _user = user.UserDao(session).get_by_cpf(cpf)

        if not _user or not _user.verify_password(password):
            return False
        return _user

    @staticmethod
    async def create_access_token(data: dict):
        to_encode = data.copy()
        # Sem tempo de expiração no momento
        encoded_jwt = jwt.encode(to_encode,
                                 settings.SECRET_KEY,
                                 algorithm=settings.ALGORITHM)
        return encoded_jwt

    @staticmethod
    async def login(form_data: OAuth2PasswordRequestForm, session: Session):

        _user = await UserService.authenticate_user(form_data.username,
                                                    form_data.password,
                                                    session)

        if not _user:
            raise HTTPException(status_code=401,
                                detail="Incorrect cpf or password")

        access_token = await UserService.create_access_token(
            data={"sub": _user.cpf})

        content = {"ok": True, "message": "Login realizado com sucesso!"}
        response = JSONResponse(content=content)

        response.set_cookie(key="*_token", value=access_token)

        return response

    @staticmethod
    async def get_current_user(session: Session = Depends(get_session),
                               token: str = Depends(oauth2_scheme)):

        try:
            payload = jwt.decode(token,
                                 settings.SECRET_KEY,
                                 algorithms=[settings.ALGORITHM])

            _user = user.UserDao(session).get_by_cpf(payload.get("sub"))
        except:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return _user
