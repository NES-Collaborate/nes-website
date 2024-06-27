from datetime import date, datetime
from typing import Optional, List

from pydantic import BaseModel

from app.models.enum import PostType, Role

from .user import UserPoster


class EnrollmentBase(BaseModel):
    userId: int
    classroomId: Optional[int] = None
    role: Role

    class Config:
        from_attributes = True


class ClassroomBase(BaseModel):
    name: str
    members: list[EnrollmentBase] = []
    video_conference: List[str]

    class Config:
        from_attributes = True


class TeacherOut(BaseModel):
    id: int
    name: str


class ClassroomOut(ClassroomBase):
    id: int
    teachers: list[TeacherOut] = []
    video_conference: List[str]

class Penalty(BaseModel):
    angularCoefficient: float
    linearCoefficient: float


class PostBase(BaseModel):
    title: str
    content: str
    postBy: UserPoster
    type: PostType
    endsOn: Optional[date]
    maxGrade: Optional[float]
    penalty: Optional[Penalty]
    weight: float = 1

    class Config:
        from_attributes = True


class PostOut(PostBase):
    id: int
    createdAt: datetime


class PostResponse(PostOut):
    subject: ClassroomOut


class CommentInp(BaseModel):
    content: str


class Author(BaseModel):
    id: int
    name: str


class CommentOut(BaseModel):
    id: int
    content: str
    addedBy: Author
    createdAt: Optional[datetime]

    class Config:
        from_attributes = True
