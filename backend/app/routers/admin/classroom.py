from app.daos.classroom import ClassroomDao
from app.daos.user import UserDao
from app.models.user import User
from app.schemas.user import MemberEdit, UserId, UserPoster
from app.services.db import get_session
from app.services.user import UserService
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/classroom", tags=["classroom"])


@router.post("/{classroomId}/members", status_code=status.HTTP_201_CREATED)
async def add_classroom_members(
    classroomId: int,
    userId: UserId,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuário não autorizado"
        )

    _classroom = ClassroomDao(session).get_by_id(classroomId)

    _enrollment = ClassroomDao(session).create_enrollment(
        **userId.model_dump(), classroomId=_classroom.id
    )

    return {
        "message": "Membro adicionados com sucesso.",
        "member": UserPoster.model_validate(_enrollment.user),
    }


@router.put("/{classroomId}/members/{memberId}", status_code=status.HTTP_200_OK)
async def update_classroom_member(
    classroomId: int,
    memberId: int,
    member: MemberEdit,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuário não autorizado"
        )

    if not ClassroomDao(session).is_member(memberId, classroomId):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não é membro da turma",
        )

    _member = UserDao(session).update(member.model_dump(), user_id=memberId)

    return {
        "message": "Informações do membro atualizadas com sucesso.",
        "member": UserPoster.model_validate(_member),
    }


@router.delete("/{classroomId}/members/{memberId}", status_code=status.HTTP_200_OK)
async def delete_classroom_member(
    classroomId: int,
    memberId: int,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuário não autorizado"
        )

    if not ClassroomDao(session).is_member(memberId, classroomId):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não é membro da turma",
        )

    ClassroomDao(session).delete_enrollment(userId=memberId, classroomId=classroomId)

    return {"message": "Membro deletado com sucesso."}
