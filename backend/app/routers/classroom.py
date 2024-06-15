from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.daos.classroom import ClassroomDao
from app.models.user import User
from app.schemas.classroom import ClassroomOut
from app.services.db import get_session
from app.services.user import UserService

router = APIRouter(prefix="/classroom", tags=["classroom"])


@router.get("/subjects", status_code=status.HTTP_200_OK)
async def get_subjects(
    current_user: User = Depends(UserService.get_current_user),
):

    if not current_user.type == "student":
        return HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuário não autorizado"
        )

    response = [
        ClassroomOut.model_validate(classroom) for classroom in current_user.classrooms
    ]

    return response


@router.get(
    "/{classroomId}", status_code=status.HTTP_200_OK, response_model=ClassroomOut
)
def get_classroom(
    classroomId: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(UserService.get_current_user),
):

    return ClassroomDao(session).get_by_id(classroomId)
