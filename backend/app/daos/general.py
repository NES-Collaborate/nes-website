from datetime import datetime, timezone
from typing import Any, List, Optional, Tuple

from fastapi import HTTPException
from sqlalchemy.orm import joinedload

from app.models.common import Comment
from app.models.user import Address, Attach, Email, PhoneNumber
from app.schemas.classroom import Author, CommentInp

from .base import BaseDao


class GeneralDao(BaseDao):
    def create_email(
        self,
        data: dict[str, Any],
        user_id: Optional[int] = None,
        school_id: Optional[int] = None,
    ) -> None:
        _email = (
            self.session.query(Email)
            .filter(Email.value == data["value"])
            .first()
        )
        if _email:
            return

        _email = Email(**data)
        _email.userId = user_id
        _email.schoolId = school_id
        self.session.add(_email)
        self.session.commit()

    def create_phone_number(
        self,
        data: dict[str, Any],
        user_id: Optional[int] = None,
        school_id: Optional[int] = None,
    ) -> None:
        _phone = (
            self.session.query(PhoneNumber)
            .filter(PhoneNumber.value == data["value"])
            .first()
        )
        if _phone:
            return

        _phone = PhoneNumber(**data)
        _phone.userId = user_id
        _phone.schoolId = school_id
        self.session.add(_phone)
        self.session.commit()

    def create_address(
        self,
        data: dict[str, Any],
        user_id: Optional[int] = None,
        school_id: Optional[int] = None,
    ) -> None:
        _address = Address(**data)
        _address.userId = user_id
        _address.schoolId = school_id
        self.session.add(_address)
        self.session.commit()

    def create_attachment(
        self, data: dict[str, Any], user_id: Optional[int] = None
    ) -> Attach:
        data.pop("id", None)
        _attach = Attach(**data)
        _attach.userId = user_id
        self.session.add(_attach)
        self.session.commit()
        return _attach

    def update_address(self, data: dict[str, Any], user_id: int) -> None:
        _address = (
            self.session.query(Address)
            .filter(Address.userId == user_id)
            .first()
        )
        if _address is None:
            return None
        for key, value in data.items():
            setattr(_address, key, value)
        self.session.commit()

    def update_attachment(self, data: dict[str, Any], user_id: int) -> None:
        _attach = (
            self.session.query(Attach)
            .filter(Attach.id == data.get("id"))
            .first()
        )
        if _attach is None:
            return None
        for key, value in data.items():
            setattr(_attach, key, value)
        self.session.commit()

    def get_comments(
        self, postId: int, page: int, page_size: int
    ) -> Tuple[List[Comment], int]:
        query = self.session.query(Comment).filter(Comment.postId == postId)

        total = query.count()

        comments = (
            query.order_by(Comment.createdAt)
            .offset((page - 1) * page_size)
            .limit(page_size)
            .all()
        )

        return comments, total

    def create_comment(
        self, comment: CommentInp, postId: int, author: Author
    ) -> Tuple[str, int, datetime]:
        new_comment = Comment(
            content=comment.content, postId=postId, addedById=author.id
        )
        self.session.add(new_comment)
        self.session.commit()
        self.session.refresh(new_comment)
        createdAt = new_comment.createdAt or datetime.now(timezone.utc)

        return new_comment.content, new_comment.id, createdAt

    def update_comment(self, comment: CommentInp, comment_id: int) -> Comment:
        db_comment = (
            self.session.query(Comment)
            .options(joinedload(Comment.addedBy))
            .filter_by(id=comment_id)
            .first()
        )

        if db_comment is None:
            raise HTTPException(
                status_code=404, detail="Cometário não encontrado"
            )

        db_comment.content = comment.content
        db_comment.updatedAt = datetime.now(timezone.utc)
        self.session.commit()
        self.session.refresh(db_comment)

        return db_comment

    def delete_comment(self, postId: int, commentId: int) -> None:
        db_comment = (
            self.session.query(Comment)
            .filter_by(id=commentId, postId=postId)
            .first()
        )

        if not db_comment:
            raise HTTPException(
                status_code=404, detail="Comentário não encontrado"
            )

        self.session.delete(db_comment)
        self.session.commit()
