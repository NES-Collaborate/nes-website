from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.daos.user import UserDao
from app.models.user import User
from app.schemas.user import UserIn, UserOut, UserPoster
from app.services.db import get_session
from app.services.user import UserService

router = APIRouter(prefix="/users", tags=["users"])


@router.get("")
async def get_users(
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
    q: Optional[str] = None,
    id: Optional[int] = None,
):
    allowed_users = ["admin", "other", "student"]
    if current_user.type not in allowed_users:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    query = session.query(User).filter(~User.softDelete)
    if q:
        query = query.filter(User.name.contains(q))
    if id:
        query = query.filter(User.id == id)

    results = query.all()

    if current_user.type == "admin" or (
        current_user.type == "student" and current_user.id == id
    ):
        users = [
            UserOut.user_validate(result, result.student) for result in results
        ]
    else:
        users = [UserPoster.model_validate(result) for result in results]
    return {"users": users}


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_user(
    user: UserIn,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    create_user_by_type = getattr(UserDao(session), f"create_{user.type}")

    _user = create_user_by_type(user.model_dump())

    return {"user": UserOut.user_validate(_user, _user.student)}


@router.put("/{user_id}")
async def update_user(
    user_id: int,
    user: UserIn,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    _user = UserDao(session).get_by_id(user_id)
    _user = UserDao(session).update(user.model_dump(), user_id)

    return {"user": UserOut.user_validate(_user, _user.student)}


@router.delete("/{user_id}")
async def delete_user(
    user_id: int,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    if user_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Você não pode apagar você mesmo....",
        )

    _user = UserDao(session).get_by_id(user_id)

    UserDao(session).soft_delete_by_id(_user.id)

    return {"message": f"Usuário com id {user_id} deletado"}

@router.delete("/delete-hard/{user_cpf}")
async def hard_delete_user(
    user_cpf: str,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
)-> dict[str, str]:
    """
    Deleta permanentemente um usuário pelo CPF.

    Este endpoint permite que um administrador delete permanentemente um usuário do sistema pelo CPF.

    Parâmetros:
    - user_cpf (str): O CPF do usuário a ser deletado.
    - current_user (User, opcional): O usuário atual que está fazendo a requisição. Recuperado do token.
    - session (Session, opcional): A sessão do banco de dados.

    Retorna:
    - dict: Uma mensagem de confirmação indicando que o usuário foi deletado.

    Exceções:
    - HTTPException: Se o usuário atual não for um administrador (401 Não Autorizado).
    - HTTPException: Se o usuário tentar deletar a si mesmo (401 Não Autorizado).
    - HTTPException: Se o usuário não for encontrado (404 Não Encontrado).
    """

    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    if user_cpf == current_user.cpf:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Você não pode apagar você mesmo....",
        )

    user_dao = UserDao(session)
    _user = user_dao.get_by_cpf(user_cpf)

    if not _user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado",
        )

    user_dao.delete_by_id(_user.id)

    return {"message": f"Usuário com cpf {user_cpf} deletado permanentemente"}