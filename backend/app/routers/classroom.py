from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.daos.classroom import ClassroomDao
from app.models.user import User
from app.schemas.classroom import ClassroomOut
from app.schemas.user import UserPoster
from app.services.db import get_session
from app.services.decorators import paginated_response
from app.services.user import UserService

router = APIRouter(prefix="/classroom", tags=["classroom"])


@router.get("/subjects", status_code=status.HTTP_200_OK)
async def get_subjects(
    current_user: User = Depends(UserService.get_current_user),
):
    if not current_user.type == "student":
        return HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    response = [
        ClassroomOut.model_validate(classroom)
        for classroom in current_user.classrooms
    ]

    return response


@router.get(
    "/{classroomId}",
    status_code=status.HTTP_200_OK,
    response_model=ClassroomOut,
)
def get_classroom(
    classroomId: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(UserService.get_current_user),
):
    return ClassroomDao(session).get_by_id(classroomId)


@router.get("/{classroomId}/members", status_code=status.HTTP_200_OK)
@paginated_response
async def get_members_classroom(
    classroomId: int,
    current_user: User = Depends(UserService.get_current_user),
    p: int = Query(1, ge=1),
    pp: int = Query(10, ge=10, le=50),
    role: Optional[str] = None,
    session: Session = Depends(get_session),
):
    _members = ClassroomDao(session).get_members_by_id(
        classroomId, p, pp, role
    )

    return [UserPoster.model_validate(member) for member in _members]
