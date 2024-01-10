from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel

from models.enum import PostType

from .user import UserPoster


class SubjectBase(BaseModel):
    name: str

    class Config:
        from_attributes = True


class SubjectOut(SubjectBase):

    id: int


class ClassroomBase(BaseModel):

    name: str

    class Config:
        from_attributes = True


class ClassroomOut(ClassroomBase):

    id: int


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
    weight: float
    subject: SubjectOut

    class Config:
        from_attributes = True


class PostOut(PostBase):

    id: int
    createdAt: datetime
