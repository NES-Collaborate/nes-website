from datetime import date
from typing import List, Optional

from pydantic import BaseModel, EmailStr

from models.base import char2, str10
from models.enum import (
    AchievementStatus,
    AchievementType,
    AttachType,
    MedalType,
    Serie,
    UserType,
)


class Attatch(BaseModel):

    name: str
    location: str
    type: AttachType


class Email(BaseModel):

    value: EmailStr


class PhoneNumber(BaseModel):

    value: str
    isEmergency: bool


class Address(BaseModel):

    name: str
    street: str
    number: Optional[int]
    neighborhood: Optional[str]
    city: str
    state: char2
    cep: str10


class Achievement(BaseModel):

    name: str
    type: AchievementType
    olympic_acronym: str
    year: int
    medal: MedalType
    link: Optional[str]
    other_info: Optional[str]
    status: AchievementStatus


class UserBase(BaseModel):
    name: str
    photo: Optional[Attatch]
    emails: Optional[List[Email]]
    phones: Optional[List[PhoneNumber]]
    address: Optional[Address]
    cpf: str
    birthdate: date
    scholarship: float
    serie: Optional[Serie]
    type: UserType
    achievements: Optional[List[Achievement]]

    class Config:
        from_attributes = True


class UserIn(UserBase):
    password: str


class UserOut(UserBase):
    id: int


class UserPoster(BaseModel):

    name: str
    emails: Optional[List[Email]]
    photo: Optional[Attatch]

    class Config:
        from_attributes = True
