from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel

from app.models.enum import PostType, Role

from .user import UserPoster


class EnrollmentBase(BaseModel):
    userId: int
    classroomId: Optional[int]
    role: Role

    class Config:
        from_attributes = True


class ClassroomBase(BaseModel):

    name: str
    members: list[EnrollmentBase] = []

    class Config:
        from_attributes = True


class TeacherOut(BaseModel):
    id: int
    name: str


class ClassroomOut(ClassroomBase):

    id: int
    teachers: list[TeacherOut]


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
