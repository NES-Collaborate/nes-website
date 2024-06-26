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


@router.get("/{postId}/comment", status_code=status.HTTP_200_OK)
@paginated_response
async def get_all_comment(
    postId: int,
    p: int = Query(1, ge=1),
    pp: int = Query(10, ge=10, le=50),
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.type != "student":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    dao = GeneralDao(session)

    comments, _ = dao.get_comments(postId=postId, page=p, page_size=pp)

    comments_out = [
        CommentOut(
            id=comment.id,
            content=comment.content,
            addedBy=Author(name=comment.addedBy.name, id=comment.addedBy.id),
            createdAt=comment.createdAt,
        )
        for comment in comments
    ]

    return [CommentOut.model_validate(comment) for comment in comments_out]


@router.post("/{postId}/comment", status_code=status.HTTP_201_CREATED)
async def add_comment(
    postId: int,
    comment: CommentInp,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.type != "student":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    author = Author(name=current_user.name, id=current_user.id)
    dao = GeneralDao(session)
    comment_content, comment_id, createdAt = dao.create_comment(
        comment=comment, postId=postId, author=author
    )

    response = CommentOut(
        id=comment_id,
        content=comment_content,
        addedBy=author,
        createdAt=createdAt,
    )

    return response


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
