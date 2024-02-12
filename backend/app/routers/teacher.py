from app.models.classroom import Classroom, Subject
from app.models.relationships import teacher_subject as ts
from app.models.user import User
from app.schemas.classroom import ClassroomOut
from app.services.db import get_session
from app.services.user import UserService
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/teacher", tags=["teacher"])


@router.get("/classrooms", status_code=status.HTTP_200_OK)
async def get_classrooms(current_user: User = Depends(
    UserService.get_current_user),
                         session: Session = Depends(get_session)):

    if current_user.type not in ["other", "admin"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Usuário não autorizado")

    if current_user.type == "admin":
        query = session.query(Classroom)
    else:
        query = session.query(Classroom.id, Classroom.name).join(
            Subject, Subject.classroom_id == Classroom.id).join(
                ts, ts.columns.subject_id == Subject.id).filter(
                    ts.columns.teacher_id == current_user.id).distinct()

    results = query.all()

    return [ClassroomOut.model_validate(result) for result in results]
