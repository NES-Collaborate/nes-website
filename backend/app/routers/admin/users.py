from typing import Optional

from app.daos.user import UserDao
from app.models.user import User
from app.schemas.user import UserIn, UserOut, UserPoster
from app.services.db import get_session
from app.services.user import UserService
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/users", tags=["users"])


@router.get("")
async def get_users(
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
    q: Optional[str] = None,
    id: Optional[int] = None,
):
    allowed_users = ["admin", "other", "student"]
    if not current_user.type in allowed_users:
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
        users = [UserOut.user_validate(result, result.student) for result in results]
    else:
        users = [UserPoster.model_validate(result) for result in results]
    return {"users": users}


@router.post("")
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
