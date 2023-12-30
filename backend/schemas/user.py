from datetime import date, datetime
from typing import List, Literal, Optional

from models.base import char2, str10
from pydantic import BaseModel, EmailStr

UserType = Literal['admin', 'user', 'student', 'responsible']
Serie = Literal['9º EF', '1º EM', '2º EM', '3º EM']
attachType = Literal['file', 'link']


class Attatch(BaseModel):

    name: str
    location: str
    type: attachType


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
    photo: Attatch
    emails: List[Email]
    phones: List[PhoneNumber]
    address: Address
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
