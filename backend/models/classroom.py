import sqlalchemy as sa #type: ignore
from datetime import date

from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, Optional
from .base import  BaseTable 

from .user import User, Attach
class Classroom(BaseTable):

    __tablename__ = "classrooms"

    name: Mapped[str]
    students: Mapped[List["User"]] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))
    subjects: Mapped[List["Subject"]] = mapped_column(sa.Integer, sa.ForeignKey("subjects.id"))

class Subject(BaseTable):

    __tablename__ = "subjects"

    name: Mapped[str]
    classrooms: Mapped[List["Classroom"]] = mapped_column(sa.Integer, sa.ForeignKey("classrooms.id"))
    posts: Mapped[List["Post"]] = mapped_column(sa.Integer, sa.ForeignKey("posts.id"))

class Post(BaseTable):

    __tablename__ = "posts"

    title: Mapped[str]
    content: Mapped[str]
    postBy: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))
    type: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("PostType.id"))
    endsOn: Mapped[Optional[date]]
    maxGrade: Mapped[Optional[float]]
    penality: Mapped["penality"] = relationship()
    weight: Mapped[float]
    Subject_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("subjects.id"))

class PostType(BaseTable):

    __tablename__ = "PostType"

    name: Mapped[str]

class penality(BaseTable):

    __tablename__ = "penality"

    angularCoefficient: Mapped[float]
    linearCoefficient: Mapped[float]

class frequency(BaseTable):

    __tablename__ = "frequency"

    post_id: Mapped["Post"] = mapped_column(sa.Integer, sa.ForeignKey("posts.id"))
    student_id: Mapped["User"] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))
    status: Mapped["FrequencyStatus"] = relationship()
    justification: Mapped[Optional[str]]

class FrequencyStatus(BaseTable):

    __tablename__ = "FrequencyStatus"

    name: Mapped[str]

class Comeent(BaseTable):

    __tablename__ = "comments"

    content: Mapped[str]
    post_id: Mapped["Post"] = mapped_column(sa.Integer, sa.ForeignKey("posts.id"))
    type: Mapped["CommentType"] = relationship()

class CommentType(BaseTable):

    __tablename__ = "CommentType"

    name: Mapped[str]
class Submission(BaseTable):

    __tablename__ = "submissions"

    post_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("posts.id"))
    attachments: Mapped[List["Attach"]] = relationship()
    student_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))
    grade: Mapped[Optional[float]]
    gradedBy: Mapped[Optional[int]] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))
    gardedAt: Mapped[Optional[date]]
