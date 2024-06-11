from app.daos.admin import AdminDao
from app.models.classroom import Classroom
from app.models.relationships import Enrollment
from app.models.user import User
from app.schemas.classroom import ClassroomBase, ClassroomOut, TeacherOut
from app.services.db import get_session
from app.services.user import UserService
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

router = APIRouter(prefix="/teacher", tags=["teacher"])


@router.get("/classrooms", status_code=status.HTTP_200_OK, response_model=list[ClassroomOut])
async def get_classrooms(
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.type not in ["other", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuário não autorizado"
        )

    if current_user.type == "admin":
        query = session.query(Classroom).options(
            joinedload(Classroom.members).joinedload(Enrollment.user)
        )
    else:
        query = (
            session.query(Enrollment.classroom)
            .filter_by(userId=current_user.id, role="teacher")
            .options(joinedload(Classroom.members).joinedload(Enrollment.user))
        )

    results = query.all()

    classrooms: list[ClassroomOut] = []
    for classroom in results:
        teachers = [
            TeacherOut(id=enrollment.user.id, name=enrollment.user.name)
            for enrollment in classroom.members
            if enrollment.role == "teacher"
        ]
        classrooms.append(ClassroomOut(id=classroom.id, name=classroom.name, teachers=teachers))

    return classrooms


@router.post("/classrooms", status_code=status.HTTP_201_CREATED)
async def create_classroom(
    classroom: ClassroomBase,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.type not in ["other", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuário não autorizado"
        )

    _classroom = AdminDao(session).create_classroom(classroom)
    return ClassroomOut.model_validate(_classroom)


@router.put("/classrooms/{classroom_id}", status_code=status.HTTP_200_OK)
async def update_classroom(
    classroom_id: int,
    classroom: ClassroomBase,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.type not in ["other", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuário não autorizado"
        )

    _classroom = AdminDao(session).update_classroom(classroom, classroom_id)
    if _classroom is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Classroom not found")
    return ClassroomOut.model_validate(_classroom)
