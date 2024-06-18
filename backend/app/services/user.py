from fastapi import Depends, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.daos import user

from .db import get_session
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
    async def create_access_token(data: dict[str, str]):
        to_encode = data.copy()
        # Sem tempo de expiração no momento
        try:
            encoded_jwt = jwt.encode(
                to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM
            )
        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro ao gerar o token de acesso",
            )
        return encoded_jwt

    @staticmethod
    async def login(form_data: OAuth2PasswordRequestForm, session: Session):
        _user = await UserService.authenticate_user(
            form_data.username, form_data.password, session
        )

        if not _user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="CPF ou senha incorretos",
            )

        access_token = await UserService.create_access_token(
            data={"sub": _user.cpf}
        )

        response = JSONResponse(
            status_code=status.HTTP_200_OK,
            content=dict(
                access_token=access_token,
                access_type="bearer",
            ),
        )

        response.set_cookie(key="_token", value=access_token, path="/")

        return response

    @staticmethod
    async def get_current_user(
        session: Session = Depends(get_session),
        token: str = Depends(oauth2_scheme),
    ):
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
            )

            _user = user.UserDao(session).get_by_cpf(payload.get("sub"))
        except:  # noqa: E722
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Não foi possível validar as credenciais",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return _user
