from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from models.classroom import Classroom, Subject
from models.relationships import teacher_subject as ts
from models.user import User
from schemas.classroom import ClassroomOut
from services.db import get_session
from services.user import UserService

router = APIRouter(prefix="/teacher", tags=["teacher"])


@router.get("/classrooms", status_code=status.HTTP_200_OK)
async def get_classrooms(current_user: User = Depends(
    UserService.get_current_user),
                         session: Session = Depends(get_session)):

    if current_user.type not in ["other", "admin"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Usuário não autorizado")

    results = session.query(Classroom.id, Classroom.name).join(
        Subject, Subject.classroom_id == Classroom.id).join(
            ts, ts.columns.subject_id == Subject.id).filter(
                ts.columns.teacher_id == current_user.id).distinct().all()

    return [ClassroomOut.model_validate(result) for result in results]
