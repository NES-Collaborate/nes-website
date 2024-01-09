from fastapi import APIRouter, Depends, HTTPException, status
from models.classroom import Classroom, Post, Subject
from models.user import User
from schemas.classroom import PostOut, SubjectOut
from services.db import get_session
from services.user import UserService
from sqlalchemy.orm import Session

router = APIRouter(prefix="/classroom", tags=["classroom"])


@router.get("/posts", status_code=status.HTTP_200_OK)
async def get_posts(current_user: User = Depends(UserService.get_current_user),
                    session: Session = Depends(get_session),
                    p: int = 1,
                    pp: int = 10,
                    s: int | None = None,
                    q: str | None = None):

    if not current_user.type == "student":
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                             detail="Usuário não autorizado")

    posts_query = session.query(Post).join(
        Subject, Post.subject_id == Subject.id).join(
            Classroom, Subject.classroom_id == Classroom.id).filter(
                Classroom.id == current_user.classroom_id).order_by(
                    Post.createdAt)

    total = posts_query.count()
    prevPage = p - 1 if p - 1 >= 1 else None
    nextPage = p + 1 if p + 1 <= total // pp else None
    results = posts_query.offset((p - 1)).limit(pp)

    data = [PostOut.model_validate(post) for post in results]

    return dict(data=data,
                total=total,
                page=p,
                nextPage=nextPage,
                prevPage=prevPage)


@router.get("/subjects", status_code=status.HTTP_200_OK)
async def get_subjects(current_user: User = Depends(
    UserService.get_current_user)):

    if not current_user.type == "student":
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                             detail="Usuário não autorizado")

    response = [
        SubjectOut.model_validate(subject)
        for subject in current_user.classroom.subjects
    ]

    return response
