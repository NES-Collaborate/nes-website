from datetime import date
from typing import List, Optional

from app.models.base import char2, str10
from app.models.enum import (
    AchievementStatus,
    AchievementType,
    AttachType,
    MedalType,
    Serie,
    UserType,
)
from pydantic import BaseModel, EmailStr


class Attach(BaseModel):
    id: int = 0
    name: str = ""
    location: str
    type: AttachType

    class Config:
        from_attributes = True


class Email(BaseModel):
    value: EmailStr

    class Config:
        from_attributes = True


class PhoneNumber(BaseModel):
    value: str
    isEmergency: bool

    class Config:
        from_attributes = True


class Address(BaseModel):
    street: str
    number: Optional[int] = None
    neighborhood: Optional[str] = None
    city: str
    state: char2
    cep: str10

    class Config:
        from_attributes = True


class Achievement(BaseModel):
    name: str
    type: AchievementType
    olympic_acronym: str
    year: int
    medal: MedalType
    link: Optional[str]
    other_info: Optional[str]
    status: AchievementStatus

    class Config:
        from_attributes = True


class ClassroomCustomIn(BaseModel):
    id: Optional[int] = None

    class Config:
        from_attributes = True


class UserBase(BaseModel):
    name: str
    photo: Optional[Attach] = None
    emails: Optional[List[Email]] = None
    phones: Optional[List[PhoneNumber]] = None
    address: Optional[Address] = None
    responsible_name: Optional[str] = None
    responsible_phone: Optional[str] = None
    cpf: str
    scholarship: Optional[float] = 0
    serie: Optional[Serie] = None
    type: UserType
    classroom: Optional[ClassroomCustomIn]

    class Config:
        from_attributes = True


class UserIn(UserBase):
    password: str
    birthdate: str


class UserOut(UserBase):
    id: int
    birthdate: date


class UserPoster(BaseModel):
    id: int
    name: str
    emails: Optional[List[Email]]
    photo: Optional[Attach]

    class Config:
        from_attributes = True


class UserMinimal(BaseModel):
    id: int
    name: str
    photo: Optional[Attach]

    class Config:
        from_attributes = True


class UserPayment(BaseModel):

    id: int
    name: str
    photo: Optional[Attach]
    scholarship: float
    alreadyPaid: Optional[bool] = None
