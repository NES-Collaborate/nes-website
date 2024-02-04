from typing import Optional

from app.daos.user import UserDao
from app.models.user import User
from app.schemas.user import UserBase, UserIn, UserOut, UserPoster
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
):
    allowed_users = ["admin", "teacher"]
    if not current_user.type in allowed_users:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    results = session.query(User).filter(User.name.contains(q or "")).all()

    if current_user.type == "admin":
        users = [UserOut.model_validate(result) for result in results]
    else:
        users = [UserPoster.model_validate(result) for result in results]
    return {"users": users}


@router.post("")
async def create_user(user: UserIn,
                      current_user: User = Depends(
                          UserService.get_current_user),
                      session: Session = Depends(get_session)):

    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )
    _user = UserDao(session).create(user.model_dump())

    return {"user": UserOut.model_validate(_user)}


@router.put("/{user_id}")
async def update_user(user_id: int,
                      user: UserBase,
                      current_user: User = Depends(
                          UserService.get_current_user),
                      session: Session = Depends(get_session)):

    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    _user = session.query(User).get(user_id)

    if not _user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado",
        )

    _user = UserDao(session).update(user.model_dump(), user_id)

    return {"user": UserOut.model_validate(_user)}


@router.delete("/{user_id}")
async def delete_user(user_id: int,
                      current_user: User = Depends(
                          UserService.get_current_user),
                      session: Session = Depends(get_session)):

    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    _user = session.query(User).get(user_id)

    if not _user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado",
        )

    UserDao(session).delete_by_id(user_id)

    return {"message": f"Usuário com id {user_id} deletado"}