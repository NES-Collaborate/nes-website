from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.daos.general import GeneralDao
from app.models.user import User
from app.schemas.classroom import CommentInp, CommentOut
from app.services.db import get_session
from app.services.user import UserService

router = APIRouter(prefix="/comment", tags=["comment"])

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

@router.put(
    "/{commentId}",
    status_code=status.HTTP_200_OK,
    response_model=CommentOut,
)
async def update_comment(
    commentId: int,
    comment: CommentInp,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.type != "student":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    dao = GeneralDao(session)
    db_comment = dao.update_comment(comment=comment, comment_id=commentId)

    return db_comment


@router.delete("/{commentId}", status_code=status.HTTP_200_OK)
async def delete_comment(
    postId: int,
    commentId: int,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.type != "student":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    dao = GeneralDao(session)

    dao.delete_comment(commentId=commentId, postId=postId)

    return {"message": "Comentário deletado com sucesso."}
