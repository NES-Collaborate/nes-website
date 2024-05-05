from datetime import date, datetime
from typing import Optional

from app.models.enum import PostType
from pydantic import BaseModel

from .user import UserPoster


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
    weight: float = 1

    class Config:
        from_attributes = True


class PostOut(PostBase):

    id: int
    createdAt: datetime
