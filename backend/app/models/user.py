from datetime import date
from typing import List, Optional, get_args

import sqlalchemy as sa
from models.enum import (
    AchievementStatus,
    AchievementType,
    AttachType,
    MedalType,
    Serie,
    UserType,
)
from passlib import hash  # type: ignore
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseTable, char2, str10


class User(BaseTable):

    __tablename__ = "users"

    name: Mapped[str]
    password: Mapped[str]
    cpf: Mapped[str] = mapped_column(sa.String, unique=True, index=True)
    birthdate: Mapped[date]
    scholarship: Mapped[float]
    serie: Mapped[Optional[Serie]] = mapped_column(sa.Enum(*get_args(Serie)))
    type: Mapped[UserType] = mapped_column(sa.Enum(*get_args(UserType)))

    photo: Mapped[Optional["Attach"]] = relationship()
    emails: Mapped[Optional[List["Email"]]] = relationship(
        back_populates="user")
    phones: Mapped[Optional[List["PhoneNumber"]]] = relationship(
        back_populates="user")
    address: Mapped[Optional["Address"]] = relationship()
    achievements: Mapped[Optional[List["Achievement"]]] = relationship()
    classroom_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("classrooms.id"))
    classroom = relationship("Classroom", back_populates="students")

    def verify_password(self, password: str | bytes):
        return hash.bcrypt.verify(password, self.password)


class Attach(BaseTable):

    __tablename__ = "attatches"

    name: Mapped[str]
    location: Mapped[str]
    type: Mapped[AttachType] = mapped_column(sa.Enum(*get_args(AttachType)))
    user_id: Mapped[Optional[int]] = mapped_column(sa.Integer,
                                                   sa.ForeignKey("users.id"))
    achievement_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("achievements.id"))
    property_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("properties.id"))


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


class Achievement(BaseTable):

    __tablename__ = "achievements"

    name: Mapped[str]
    type: Mapped[AchievementType] = mapped_column(
        sa.Enum(*get_args(AchievementType)))
    olympic_acronym: Mapped[str]
    year: Mapped[int]
    medal: Mapped[MedalType] = mapped_column(sa.Enum(*get_args(MedalType)))
    link: Mapped[Optional[str]]
    other_info: Mapped[Optional[str]]
    status: Mapped[AchievementStatus] = mapped_column(
        sa.Enum(*get_args(AchievementStatus)))
    user_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))

    images: Mapped[Optional[List["Attach"]]] = relationship()
