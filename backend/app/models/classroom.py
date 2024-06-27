from datetime import datetime
from typing import List, Optional, get_args

from sqlalchemy import JSON
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseTable
from .common import Comment, Message, Response
from .enum import AttachType, FrequencyStatus, PostType
from .relationships import ActivityGroup
from .user import Attach, Enrollment, Student, User


class Classroom(BaseTable):
    __tablename__ = "classrooms"

    name: Mapped[str]
    thumbnail: Mapped["Attach"] = relationship()
    posts: Mapped[List["Post"]] = relationship(back_populates="classroom")
    activityGroups: Mapped[List["ActivityGroup"]] = relationship(
        back_populates="classroom"
    )
    members: Mapped[List["Enrollment"]] = relationship(
        back_populates="classroom"
    )
    video_conference: Mapped[List[str]] = mapped_column(JSON)

    @property
    def teachers(self):
        return [m.user for m in self.members if m.role == "teacher"]


class Activity(BaseTable):
    __tablename__ = "activities"

    postId: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("posts.id")
    )
    post: Mapped["Post"] = relationship("Post", back_populates="activity")

    startDate: Mapped[Optional[datetime]]
    endDate: Mapped[Optional[datetime]]
    maxGrade: Mapped[float]
    activityGroupId: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("activity_groups.id")
    )
    activityGroup: Mapped["ActivityGroup"] = relationship(
        "ActivityGroup", back_populates="activities"
    )
    linearCoefficient: Mapped[float]
    angularCoefficient: Mapped[float]
    weight: Mapped[float] = mapped_column(sa.Float, default=1)


class Serie(BaseTable):
    __tablename__ = "series"

    student: Mapped[List["Student"]] = relationship(
        "Student", back_populates="serie"
    )
    name: Mapped[str]


class Post(BaseTable):
    __tablename__ = "posts"

    classromId: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("classrooms.id")
    )
    classroom: Mapped["Classroom"] = relationship(
        "Classroom", back_populates="posts"
    )
    title: Mapped[str]
    content: Mapped[str]
    frequency: Mapped[List["Frequency"]] = relationship(
        "Frequency", back_populates="lecture"
    )
    type: Mapped[PostType] = mapped_column(sa.Enum(*get_args(PostType)))
    attachments: Mapped[List["PostAttachment"]] = relationship(
        "PostAttachment", back_populates="post"
    )
    activity: Mapped[Optional["Activity"]] = relationship(
        "Activity", back_populates="post"
    )
    response: Mapped[Optional["Response"]] = relationship(
        "Response", back_populates="post", foreign_keys="Response.postId"
    )
    responses: Mapped[List["Response"]] = relationship(
        "Response",
        back_populates="activity",
        foreign_keys="Response.activityId",
    )

    comments: Mapped[List["Comment"]] = relationship(
        "Comment", back_populates="post"
    )
    messages: Mapped[List["Message"]] = relationship(
        "Message", back_populates="post"
    )


class Frequency(BaseTable):
    __tablename__ = "frequencies"

    studentId: Mapped[int] = mapped_column(
        sa.Integer, sa.ForeignKey("users.id")
    )
    student: Mapped["User"] = relationship("User", foreign_keys=[studentId])
    lecture: Mapped["Post"] = relationship("Post", back_populates="frequency")
    postId: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("posts.id")
    )
    status: Mapped[FrequencyStatus] = mapped_column(
        sa.Enum(*get_args(FrequencyStatus))
    )
    justification: Mapped[Optional[str]]


class PostAttachment(BaseTable):
    __tablename__ = "post_attachments"

    postId: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("posts.id"))
    post: Mapped["Post"] = relationship("Post", back_populates="attachments")
    name: Mapped[str]
    type: Mapped[AttachType] = mapped_column(sa.Enum(*get_args(AttachType)))
    metaData: Mapped[str]
