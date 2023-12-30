from datetime import date
from typing import List, Optional

from models.base import char2, str10
from models.enum import AttachType, Serie, UserType
from pydantic import BaseModel, EmailStr


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


class UserBase(BaseModel):
    name: str
    photo: Optional[Attatch]
    emails: Optional[List[Email]]
    phones: Optional[List[PhoneNumber]]
    address: Optional[Address]
    cpf: str
    birthdate: date
    scholarship: float
    serie: Serie
    type: UserType

    class Config:
        from_atributes = True


class UserIn(UserBase):
    password: str


class UserOut(UserBase):
    id: int
