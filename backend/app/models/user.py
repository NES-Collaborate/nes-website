from datetime import date
from typing import List, Optional, get_args

import sqlalchemy as sa
from passlib import hash
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseTable, char2, str10
from .common import Message
from .enum import (
    AccountType,
    AchievementStatus,
    AchievementType,
    AttachType,
    MedalType,
    UserType,
)
from .relationships import Enrollment


class User(BaseTable):
    __tablename__ = "users"

    name: Mapped[str]
    photo: Mapped[Optional["Attach"]] = relationship(
        foreign_keys="[Attach.userId]"
    )
    password: Mapped[str]
    cpf: Mapped[str] = mapped_column(sa.String, unique=True, index=True)
    birth: Mapped[date]
    address: Mapped["Address"] = relationship(
        "Address", foreign_keys="[Address.userId]"
    )
    type: Mapped[UserType] = mapped_column(sa.Enum(*get_args(UserType)))
    softDelete: Mapped[bool] = mapped_column(sa.Boolean, default=False)

    emails: Mapped[Optional[List["Email"]]] = relationship(
        "Email", foreign_keys="[Email.userId]"
    )
    phones: Mapped[Optional[List["PhoneNumber"]]] = relationship(
        "PhoneNumber", foreign_keys="[PhoneNumber.userId]"
    )
    student: Mapped[Optional["Student"]] = relationship(
        "Student", back_populates="user", foreign_keys="[Student.userId]"
    )
    bankAccount: Mapped[Optional["BankAccount"]] = relationship(
        "BankAccount", foreign_keys="[BankAccount.userId]"
    )
    classrooms: Mapped[List["Enrollment"]] = relationship(
        "Enrollment", back_populates="user", foreign_keys="[Enrollment.userId]"
    )
    posts = relationship("Post", back_populates="addedBy", uselist=True)
    received: Mapped[List["Message"]] = relationship(
        "Message", back_populates="toUser", foreign_keys="[Message.toId]"
    )
    sent: Mapped[List["Message"]] = relationship(
        "Message", back_populates="fromUser", foreign_keys="[Message.fromId]"
    )

    def verify_password(self, password: str | bytes):
        return hash.bcrypt.verify(password, self.password)


class Student(BaseTable):
    __tablename__ = "students"

    userId: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))
    user: Mapped["User"] = relationship(
        "User", back_populates="student", foreign_keys=[userId]
    )

    serie = relationship("Serie", back_populates="student")
    serieId: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("series.id")
    )
    scholarshipValue: Mapped[float]
    achievements: Mapped[List["Achievement"]] = relationship(
        "Achievement", back_populates="student"
    )
    achievementsId: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("achievements.id")
    )
    responsibleName: Mapped[str]
    responsibleNumber: Mapped[str]


class Attach(BaseTable):
    __tablename__ = "attatches"

    name: Mapped[str]
    location: Mapped[str]
    type: Mapped[AttachType] = mapped_column(sa.Enum(*get_args(AttachType)))

    userId: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("users.id")
    )

    achievementId: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("achievements.id")
    )

    propertyId: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("properties.id")
    )

    classroomId: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("classrooms.id")
    )


class Email(BaseTable):
    __tablename__ = "emails"

    value: Mapped[str]
    userId: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("users.id")
    )
    schoolId: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("schools.id")
    )


class PhoneNumber(BaseTable):
    __tablename__ = "phone_numbers"

    value: Mapped[str]
    isEmergency: Mapped[bool]
    userId: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("users.id")
    )
    schoolId: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("schools.id")
    )


class Address(BaseTable):
    __tablename__ = "addresses"

    street: Mapped[str]
    number: Mapped[Optional[int]]
    neighborhood: Mapped[Optional[str]]
    city: Mapped[str]
    state: Mapped[char2 | None]
    cep: Mapped[str10 | None]
    userId: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("users.id")
    )
    schoolId: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("schools.id")
    )


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
        sa.Enum(*get_args(AchievementType))
    )
    olympicAbbrev: Mapped[str]
    year: Mapped[int]
    medal: Mapped[MedalType] = mapped_column(sa.Enum(*get_args(MedalType)))
    link: Mapped[Optional[str]]
    otherInfo: Mapped[Optional[str]]
    status: Mapped[AchievementStatus] = mapped_column(
        sa.Enum(*get_args(AchievementStatus))
    )
    student: Mapped["Student"] = relationship(
        "Student", back_populates="achievements"
    )

    images: Mapped[Optional[List["Attach"]]] = relationship()


class BankAccount(BaseTable):
    __tablename__ = "bank_accounts"

    userId: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))
    bankNumber: Mapped[int]
    agencyNumber: Mapped[int]
    accountNumber: Mapped[int]
    accountType: Mapped[AccountType] = mapped_column(
        sa.Enum(*get_args(AccountType))
    )
    pix: Mapped[str]
