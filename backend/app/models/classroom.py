from datetime import date
from typing import List, Optional, get_args

import sqlalchemy as sa  # type: ignore
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseTable
from .enum import CommentType, FrequencyStatus, PostType
from .relationships import teacher_subject
from .user import User


class Classroom(BaseTable):

    __tablename__ = "classrooms"

    name: Mapped[str]
    students: Mapped[List["User"]] = relationship(back_populates="classroom")
    subjects: Mapped[List["Subject"]] = relationship()


class Subject(BaseTable):

    __tablename__ = "subjects"

    name: Mapped[str]
    classroom_id: Mapped[int] = mapped_column(sa.Integer,
                                              sa.ForeignKey("classrooms.id"))
    teachers: Mapped[List["User"]] = relationship(secondary=teacher_subject)
    posts: Mapped[List["Post"]] = relationship(back_populates="subject")


class Post(BaseTable):

    __tablename__ = "posts"

    title: Mapped[str]
    content: Mapped[str]
    user_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))
    postBy: Mapped["User"] = relationship()
    type: Mapped[PostType] = mapped_column(sa.Enum(*get_args(PostType)))
    endsOn: Mapped[Optional[date]]
    maxGrade: Mapped[Optional[float]]
    penalty_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("penalties.id"), nullable=True)
    penalty: Mapped["Penalty"] = relationship()
    weight: Mapped[float] = mapped_column(sa.Float, default=1)
    subject_id: Mapped[int] = mapped_column(sa.Integer,
                                            sa.ForeignKey("subjects.id"))
    subject: Mapped["Subject"] = relationship(back_populates="posts")


class Penalty(BaseTable):

    __tablename__ = "penalties"

    angularCoefficient: Mapped[float]
    linearCoefficient: Mapped[float]


class frequency(BaseTable):

    __tablename__ = "frequency"

    post_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("posts.id"))
    student_id: Mapped[int] = mapped_column(sa.Integer,
                                            sa.ForeignKey("users.id"))
    status: Mapped[FrequencyStatus] = mapped_column(
        sa.Enum(*get_args(FrequencyStatus)))
    justification: Mapped[Optional[str]]


class Comment(BaseTable):

    __tablename__ = "comments"

    content: Mapped[str]
    post_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("posts.id"))
    post: Mapped["Post"] = relationship()
    type: Mapped[CommentType] = mapped_column(sa.Enum(*get_args(CommentType)))


"""
class Submission(BaseTable):

    __tablename__ = "submissions"

    post_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("posts.id"))
    post: Mapped["Post"] = relationship()
    #attachments: Mapped[List["Attach"]] = relationship()
    student_id: Mapped[int] = mapped_column(sa.Integer,
                                            sa.ForeignKey("users.id"))
    submission_by: Mapped["User"] = relationship()
    grade: Mapped[Optional[float]]
    teacher_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("users.id"))
    graded_by: Mapped[Optional["User"]] = relationship()
    garded_at: Mapped[Optional[date]]
"""
