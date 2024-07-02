from datetime import datetime
from typing import List, Literal, Optional

from pydantic import BaseModel

from app.models.enum import AttachType, FrequencyStatus, PostType, Role
from app.schemas.user import UserMinimal


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


class ActivityGroup(BaseModel):
    pass


class Frequency(BaseModel):
    student: UserMinimal
    status: FrequencyStatus
    justification: Optional[str]


class PostAttachment(BaseModel):
    id: int
    name: str
    type: AttachType
    metadata: str

    class Config:
        from_attributes = True


class PostBase(BaseModel):
    title: str
    content: str
    attachments: Optional[list[int]]

    class Config:
        from_attributes = True


class PostIn(PostBase):
    type: Literal["notice", "lecture"]


class ActivityBase(BaseModel):
    startDate: Optional[datetime]
    endDate: Optional[datetime]
    maxGrade: Optional[float]
    linearCoefficient: Optional[float]
    angularCoefficient: Optional[float]
    weight: float = 1


class Activity(ActivityBase):
    id: int
    activityGroup: Optional[ActivityGroup]

    class Config:
        from_attributes = True


class ResponseBase(BaseModel):
    grade: Optional[float]


class Response(ResponseBase):
    id: int

    class Config:
        from_attributes = True


class ActivityPostIn(ActivityBase, PostBase):
    type: Literal["activity", "test"]
    activityGroupId: Optional[int]


class PostOut(PostBase):
    id: int
    type: PostType
    createdAt: datetime
    addedBy: UserMinimal
    # frequency: list[Frequency]
    # responses: list[Response]
    # comments: list[CommentOut]


class ActivityPostOut(PostOut):
    activity: Activity


class ResponsePostIn(ResponseBase, PostBase):
    type: str = "response"
    activityId: int


class ResponsePostOut(PostOut):
    response: Response


class PostResponse(PostOut):
    classroom: ClassroomOut


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
