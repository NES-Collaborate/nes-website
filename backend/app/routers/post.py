from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.daos.admin import AdminDao
from app.daos.general import GeneralDao
from app.daos.post import PostDao
from app.models.user import User
from app.schemas.classroom import (
    Author,
    ClassroomBase,
    ClassroomOut,
    CommentInp,
    CommentOut,
    PostResponse,
)
from app.services.db import get_session
from app.services.decorators import paginated_response
from app.services.user import UserService

router = APIRouter(prefix="/post", tags=["post"])

@router.get("", status_code=status.HTTP_200_OK)
@paginated_response
async def get_all_posts(
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
    p: int = Query(1, ge=1),
    pp: int = Query(10, ge=10, le=50),
    s: Optional[int] = None,
    q: Optional[str] = None,
    classroomId: Optional[int] = None,
):
    classroom_ids = (
        [classroomId]
        if classroomId
        else [enrollment.classroomId for enrollment in current_user.classrooms]
    )

    # TODO: get the members of each classroom and verify if the current user is a member of.

    dao = PostDao(session)
    posts, _ = dao.get_posts(classroom_ids, p, pp, s, q)

    return [PostResponse.model_validate(post) for post in posts]


@router.put("/classrooms/{classroom_id}", status_code=status.HTTP_200_OK)
async def update_classroom(
    classroom_id: int,
    classroom: ClassroomBase,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.type not in ["other", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    _classroom = AdminDao(session).update_classroom(classroom, classroom_id)
    if _classroom is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Classroom not found"
        )
    return ClassroomOut.model_validate(_classroom)
    _classroom = AdminDao(session).update_classroom(classroom, classroom_id)
    if _classroom is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Classroom not found"
        )
    return ClassroomOut.model_validate(_classroom)
