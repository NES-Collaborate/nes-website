from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.daos.general import GeneralDao
from app.models.user import User
from app.schemas.classroom import CommentInp, CommentOut
from app.services.db import get_session
from app.services.user import UserService

router = APIRouter(prefix="/comment", tags=["comment"])


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
