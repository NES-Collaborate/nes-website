from datetime import  datetime
import datetime
from typing import List, Optional, get_args

import sqlalchemy as sa  # type: ignore
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseTable
from .enum import AttachType, FrequencyStatus, PostType
#from .relationships import teacher_subject
from .user import User, Attach, Enrollment, Student


class Classroom(BaseTable):

    __tablename__ = "classrooms"

    name: Mapped[str]
    thumbnail: Mapped["Attach"] = relationship("Attach", back_populates= "classrooms")
    posts: Mapped[List["Post"]] = relationship("Post", back_populates="classroom") 
    activityGroups : Mapped[List["ActivityGroup"]] = relationship("ActivityGroup", back_populates="classrooms") 
    members: Mapped[List["Enrollment"]] = relationship("Enrollment", back_populates="classroom")




class ActivityGroup(BaseTable):

    __tablename__ = "activityGroups"
    
    classroom_id: Mapped[Optional[int]] = mapped_column(sa.Integer, sa.ForeignKey("classrooms.id"))
    classroom: Mapped[Classroom] = relationship("Classroom", back_populates="activityGroups")
    activities: Mapped[List["Activity"]] = relationship("Activity", back_populates="activityGroup")
    isRecovery: Mapped[bool]
    


class Activity(BaseTable): 
    __tablename__ = "activities"

    post_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("posts.id")
    )
    post: Mapped["Post"] =  relationship("Post", back_populates="activity")

    startDate: Mapped[Optional[datetime.datetime]]
    endDate: Mapped[Optional[datetime.datetime]]
    maxGrade: Mapped[float]
    activityGroup_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("activityGroups.id")
    )
    activityGroup: Mapped["ActivityGroup"] = relationship("ActivityGroup", back_populates="activities")
    linearCoefficient: Mapped[float]
    angularCoefficient: Mapped[float]
    weight: Mapped[float] = mapped_column(sa.Float, default=1)

"""class Subject(BaseTable):

    __tablename__ = "subjects"

    name: Mapped[str]
    classroom_id: Mapped[int] = mapped_column(sa.Integer,
                                              sa.ForeignKey("classrooms.id"))
    teachers: Mapped[List["User"]] = relationship(secondary=teacher_subject)
    posts: Mapped[List["Post"]] = relationship(back_populates="subject")"""

class Serie(BaseTable):

    __tablename__ = "series" 
    
    student: Mapped[List["Student"]] = relationship("Student", back_populates= "serie") 
    name: Mapped[str]

class Post(BaseTable):

    __tablename__ = "posts"

    classroom: Mapped["Classroom"] = relationship("Classroom", back_populates="posts")
    classrom_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("classrooms.id")
    )
    title: Mapped[str]
    content: Mapped[str]
    frequency: Mapped[List["Frequency"]] = relationship("Frequency", back_populates="lecture")
    type: Mapped[PostType] = mapped_column(sa.Enum(*get_args(PostType)))
    user: Mapped["User"] = relationship("User", back_populates="posts")
    user_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))
    attachments: Mapped[List["PostAttachment"]] = relationship("PostAttachment", back_populates="post")
    activity: Mapped["Activity"] = relationship("Activity", uselist=False, back_populates="post") 
    response_id: Mapped[Optional[int]] = mapped_column(sa.Integer, sa.ForeignKey("responses.id"))
    response: Mapped[Optional["Response"]] = relationship("Response", foreign_keys=[response_id])
    responses: Mapped[List["Response"]] = relationship("Response", back_populates="post")
    
    coments: Mapped[List["Comment"]] = relationship("Comment", 
    back_populates="posts")
    messages: Mapped[List["Message"]] = relationship("Message", back_populates="post") 
    
    
    

class Response(BaseTable): 

    __tablename__ = "responses"

    post_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("posts.id"))
    post: Mapped["Post"] = relationship("Post", back_populates="responses")
    grade: Mapped[Optional[float]]
    activity: Mapped["Post"] = relationship("Post", back_populates="responses")

class Message(BaseTable):

    __tablename__ = "messages"
    
    from_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))
    from_: Mapped["User"] = relationship("User", back_populates="sent")
    to_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))
    to: Mapped["User"] = relationship("User", back_populates="received")
    content: Mapped[str]
    post: Mapped[Optional["Post"]] = relationship("Post", back_populates="messages") 
    post_id : Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("posts.id")
    )


"""class Penalty(BaseTable):

    __tablename__ = "penalties"

    angularCoefficient: Mapped[float]
    linearCoefficient: Mapped[float]
"""

class Frequency(BaseTable):

    __tablename__ = "frequencies"
    
    student: Mapped["User"]
    lecture: Mapped["Post"] = relationship("Post", back_populates="frequency")
    post_id: Mapped[Optional[int]] = mapped_column(sa.Integer, sa.ForeignKey("posts.id")) 
    status: Mapped[FrequencyStatus] = mapped_column(
        sa.Enum(*get_args(FrequencyStatus))
    )

    justification: Mapped[Optional[str]]

class PostAttachment(BaseTable):

    __tablename__ = "postattachments"

    post_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("posts.id"))
    post: Mapped["Post"] = relationship("Post", back_populates="attachments")
    name: Mapped[str]
    type: Mapped[AttachType] = mapped_column(
        sa.Enum(*get_args(AttachType))
    )
    meta_data: Mapped[str]


class Comment(BaseTable):

    __tablename__ = "comments"

    content: Mapped[str]
    content: Mapped[str]
    post: Mapped["Post"] = relationship("Post", back_populates="messages") 
    post_id: Mapped[Optional[int]] = mapped_column(sa.Integer, sa.ForeignKey("posts.id"))


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
