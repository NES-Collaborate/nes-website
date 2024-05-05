from app.models.user import User
from app.schemas.classroom import ClassroomOut
from app.services.db import get_session
from app.services.user import UserService
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/classroom", tags=["classroom"])


@router.get("/subjects", status_code=status.HTTP_200_OK)
async def get_subjects(
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):

    if not current_user.type == "student":
        return HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuário não autorizado"
        )

    response = [
        ClassroomOut.model_validate(classroom) for classroom in current_user.classrooms
    ]

    return response
