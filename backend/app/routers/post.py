from typing import Optional, Union

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from starlette.status import HTTP_200_OK, HTTP_201_CREATED

from app.daos.admin import AdminDao
from app.daos.classroom import ClassroomDao
from app.daos.general import GeneralDao
from app.daos.post import PostDao
from app.models.user import User
from app.schemas.classroom import (
    ActivityPostIn,
    Author,
    ClassroomBase,
    ClassroomOut,
    CommentInp,
    CommentOut,
    PostIn,
    PostResponse,
    ResponsePostIn,
)
from app.services.db import get_session
from app.services.decorators import paginated_response, post_type_response
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


@router.post("", status_code=HTTP_201_CREATED)
@post_type_response
async def create_post(
    classroomId: int,
    post: Union[PostIn, ActivityPostIn, ResponsePostIn],
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):

    _is_member = ClassroomDao(session).is_member(current_user.id, classroomId)

    if current_user.type not in ["admin", "other"] and not _is_member:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    create_post_by_type = getattr(PostDao(session), f"create_{post.type}")

    _post = create_post_by_type(post, classroomId, current_user.id)

    return _post


@router.get("/{postId}", status_code=status.HTTP_200_OK)
@post_type_response
async def get_post(
    postId: int,
    classroomId: int,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):

    _is_member = ClassroomDao(session).is_member(current_user.id, classroomId)

    if not _is_member:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    _post = PostDao(session).get_by_id(postId)

    return _post


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


@router.put("/classrooms/{classroomId}", status_code=status.HTTP_200_OK)
async def update_classroom(
    classroomId: int,
    classroom: ClassroomBase,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.type not in ["other", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    _classroom = AdminDao(session).update_classroom(classroom, classroomId)
    if _classroom is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Classroom not found"
        )
    return ClassroomOut.model_validate(_classroom)


@router.put("/{postId}", status_code=HTTP_200_OK)
@post_type_response
async def update_post(
    postId: int,
    classroomId: int,
    post: Union[PostIn, ActivityPostIn, ResponsePostIn],
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
    _is_member = ClassroomDao(session).is_member(current_user.id, classroomId)

    if current_user.type not in ["admin", "other"] and not _is_member:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    update_post_by_type = getattr(PostDao(session), f"update_{post.type}")

    _post = update_post_by_type(postId, post)

    return _post


@router.delete("/{postId}", status_code=HTTP_200_OK)
async def delete_post(
    postId: int,
    classroomId: int,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):

    _is_member = ClassroomDao(session).is_member(current_user.id, classroomId)

    if current_user.type not in ["admin", "other"] and not _is_member:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    PostDao(session).delete_by_id(postId)

    return {"message": "Post deletado com sucesso"}
