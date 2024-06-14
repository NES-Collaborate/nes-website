from typing import Optional

from app.models.user import User
from app.services.user import UserService
from fastapi import APIRouter, Depends, HTTPException, status, Query
from app.services.db import get_session
from sqlalchemy.orm import Session
from app.daos.general import GeneralDao
from app.schemas.classroom import  Author, CommentInp, CommentOut, CommentPaginateResponse, PostPaginateResponse, PostResponse
from app.daos.post import PostDao

router = APIRouter(prefix="/student", tags=["student"])


@router.get("/posts", status_code= status.HTTP_200_OK)
async def get_all_posts( 
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
    p: int = Query(1, ge= 1),
    pp: int = Query(10, ge = 10, le= 50),
    s: Optional[int]  = None,
    q: Optional[str] = None, 
    ): 

    if current_user.type != "student":
        raise HTTPException(
            status_code= status.HTTP_401_UNAUTHORIZED, detail= "Usuário não autorizado"
        )
    
    classroom_ids = [enrollment.classroomId for enrollment in current_user.classrooms]
    dao = PostDao(session)
    posts, total = dao.get_posts(classroom_ids, p, pp, s, q)

    last_page = (total // pp) + (1 if total % pp != 0 else 0)
    next_page = p + 1 if p * pp < total else None
    prev_page = p - 1 if p > 1 else None

    response = PostPaginateResponse(
        data=[PostResponse.model_validate(post) for post in posts],
        total=total,
        page=p,
        nextPage=next_page,
        prevPage=prev_page,
        lastPage=last_page
    )
    
    return response


@router.get("/posts/{postId}/comments", status_code= status.HTTP_200_OK)
async def get_all_comment(postId: int, p: int = Query(1, ge = 1), pp: int =Query(10, ge = 10, le=50), current_user: User = Depends(UserService.get_current_user), 
session: Session = Depends(get_session)):
    
    
    if current_user.type != "student":
        raise HTTPException(
            status_code= status.HTTP_401_UNAUTHORIZED, detail= "Usuário não autorizado"
        )
    
    dao = GeneralDao(session)

    comments, total = dao.get_comments(postId=postId, page = p, page_size =pp)
    
    comments_out = [CommentOut( id=comment.id, content=comment.content, 
    author=Author(name= comment.addedBy.name, id = comment.addedBy.id), createdAt=comment.createdAt       
    ) for comment in comments]
    
    last_page = (total // pp) + (1 if total % pp != 0 else 0)
    next_page = p + 1 if p * pp < total else None
    prev_page = p - 1 if p > 1 else None


    response = CommentPaginateResponse(
        data = [CommentOut.model_validate(comment) for comment in comments_out],
        total=total,
        page=p,
        nextPage=next_page,
        prevPage=prev_page,
        lastPage=last_page
    )

    return response



@router.post("/posts/{postId}/comments", status_code=status.HTTP_201_CREATED)
async def add_comment( postId: int,
    comment: CommentInp,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session)
    
):
    if current_user.type != "student":
        raise HTTPException(
            status_code= status.HTTP_401_UNAUTHORIZED, detail = "Usuário não autorizado"
        )

    author = Author(name=current_user.name, id=current_user.id)
    dao = GeneralDao(session)
    comment_content, comment_id, createdAt = dao.create_comment(comment=comment, postId=postId, author = author )

    response = CommentOut(
        id=comment_id,
        content=comment_content,
        author=author,
        createdAt=createdAt
    )

    return response

@router.put("/posts/{postId}/comments/{commentId}" ,status_code=status.HTTP_200_OK)
async def update_comment(postId: int, commentId: int, 
    comment: CommentInp, current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session)):
    
    if current_user.type != "student":
            raise HTTPException(
                status_code= status.HTTP_401_UNAUTHORIZED, detail = "Usuário não autorizado"
        )

    dao = GeneralDao(session)
    comment_content, comment_id, createdAt, author = dao.update_comment(comment=comment,postId= postId, comment_id= commentId)

    response = CommentOut(
        id = comment_id,
        content= comment_content,
        author= author,
        createdAt= createdAt
    )

    return response

@router.delete("/posts/{postId}/comments/{commentId}", status_code= status.HTTP_200_OK)
async def delete_comment(postId: int, 
commentId: int, current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session)):

    if current_user.type != "student":
            raise HTTPException(
                status_code= status.HTTP_401_UNAUTHORIZED, detail = "Usuário não autorizado"
        )

    dao = GeneralDao(session)

    dao.delete_comment(commentId=commentId, postId=postId)

    return {"message": "Comentário deletado com sucesso."}


