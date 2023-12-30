from datetime import date, datetime
from typing import List, Literal, Optional, get_args

import sqlalchemy as sa
from models.enum import AttachType, Serie, UserType
from passlib import hash
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseTable, char2, str10


class User(BaseTable):

    __tablename__ = "users"

    name: Mapped[str]
    password: Mapped[str]
    cpf: Mapped[str] = mapped_column(sa.String, unique=True, index=True)
    birthdate: Mapped[date]
    scholarship: Mapped[float]
    serie: Mapped[Serie] = mapped_column(sa.Enum(*get_args(Serie)))
    type: Mapped[UserType] = mapped_column(sa.Enum(*get_args(UserType)))

    photo: Mapped["Attatch"] = relationship()
    emails: Mapped[List["Email"]] = relationship(back_populates="user")
    phones: Mapped[List["PhoneNumber"]] = relationship(back_populates="user")
    address: Mapped["Address"] = relationship()

    def verify_password(self, password):
        return hash.bcrypt.verify(password, self.password)


class Attatch(BaseTable):

    __tablename__ = "attatches"

    name: Mapped[str]
    location: Mapped[str]
    type: Mapped[AttachType] = mapped_column(sa.Enum(*get_args(AttachType)))
    user_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))


class Email(BaseTable):

    __tablename__ = "emails"

    value: Mapped[str]
    user_id: Mapped[Optional[int]] = mapped_column(sa.Integer,
                                                   sa.ForeignKey("users.id"))
    school_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("schools.id"))

    user: Mapped["User"] = relationship(back_populates="emails")


class PhoneNumber(BaseTable):

    __tablename__ = "phone_numbers"

    value: Mapped[str]
    isEmergency: Mapped[bool]
    user_id: Mapped[Optional[int]] = mapped_column(sa.Integer,
                                                   sa.ForeignKey("users.id"))
    school_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("schools.id"))

    user: Mapped["User"] = relationship(back_populates="phones")


class Address(BaseTable):

    __tablename__ = "addresses"

    name: Mapped[str]
    street: Mapped[str]
    number: Mapped[Optional[int]]
    neighborhood: Mapped[Optional[str]]
    city: Mapped[str]
    state: Mapped[char2 | None]
    cep: Mapped[str10 | None]
    user_id: Mapped[Optional[int]] = mapped_column(sa.Integer,
                                                   sa.ForeignKey("users.id"))
    school_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("schools.id"))


class School(BaseTable):

    __tablename__ = "schools"

    name: Mapped[str]
    phones: Mapped[List["PhoneNumber"]] = relationship()
    address: Mapped["Address"] = relationship()
    emails: Mapped[List["Email"]] = relationship()
