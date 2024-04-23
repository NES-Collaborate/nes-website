from typing import Optional

import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseTable


class Response(BaseTable):

    __tablename__ = "responses"

    postId: Mapped[Optional[int]] = mapped_column(sa.Integer, sa.ForeignKey("posts.id"))
    post = relationship("Post", back_populates="response", foreign_keys=[postId])
    grade: Mapped[Optional[float]]
    activityId: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("posts.id"))
    activity = relationship(
        "Post", back_populates="responses", foreign_keys=[activityId]
    )


class Message(BaseTable):

    __tablename__ = "messages"

    fromId: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))
    fromUser = relationship("User", back_populates="sent", foreign_keys=[fromId])
    toId: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))
    toUser = relationship("User", back_populates="received", foreign_keys=[toId])
    content: Mapped[str]
    post = relationship("Post", back_populates="messages")
    postId: Mapped[Optional[int]] = mapped_column(sa.Integer, sa.ForeignKey("posts.id"))


class Comment(BaseTable):

    __tablename__ = "comments"

    content: Mapped[str]
    post = relationship("Post", back_populates="coments")
    postId: Mapped[Optional[int]] = mapped_column(sa.Integer, sa.ForeignKey("posts.id"))
