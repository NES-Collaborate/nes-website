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
    id: int
    name: str
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
    name: str
    street: str
    number: Optional[int]
    neighborhood: Optional[str]
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


class UserBase(BaseModel):
    name: str
    photo: Optional[Attach]
    emails: Optional[List[Email]]
    phones: Optional[List[PhoneNumber]]
    address: Optional[Address]
    cpf: str
    birthdate: date
    scholarship: float
    serie: Optional[Serie]
    type: UserType

    class Config:
        from_attributes = True


class UserIn(UserBase):
    password: str


class UserOut(UserBase):
    id: int


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

    class Config:
        from_attributes = True


class UserPayment(BaseModel):

    id: int
    name: str
    photo: Optional[Attach]
    scolarship: float
    already_paid: Optional[bool]
