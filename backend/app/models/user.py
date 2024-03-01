from datetime import date
from typing import List, Optional, get_args

import sqlalchemy as sa
from passlib import hash  # type: ignore
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseTable, char2, str10
from .enum import (
    AccountType,
    AchievementStatus,
    AchievementType,
    AttachType,
    MedalType,
    Serie,
    UserType,
)


class User(BaseTable):

    __tablename__ = "users"

    name: Mapped[str]
    password: Mapped[str]
    cpf: Mapped[str] = mapped_column(sa.String, unique=True, index=True)
    birthdate: Mapped[date]
    scholarship: Mapped[float]
    responsible_name: Mapped[Optional[str]]
    responsible_phone: Mapped[Optional[str]]
    serie: Mapped[Optional[Serie]] = mapped_column(sa.Enum(*get_args(Serie)))
    type: Mapped[UserType] = mapped_column(sa.Enum(*get_args(UserType)))
    soft_delete: Mapped[bool] = mapped_column(sa.Boolean, default=False)

    photo: Mapped[Optional["Attach"]] = relationship()

    emails: Mapped[Optional[List["Email"]]] = relationship(
        back_populates="user"
    )
    phones: Mapped[Optional[List["PhoneNumber"]]] = relationship(
        back_populates="user"
    )

    address: Mapped[Optional["Address"]] = relationship()
    achievements: Mapped[Optional[List["Achievement"]]] = relationship()
    classroom_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("classrooms.id")
    )

    bank_account_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("bank_accounts.id")
    )
    bank_account: Mapped[Optional["BankAccount"]] = relationship(
        "BankAccount", back_populates="user"
    )

    classroom = relationship("Classroom", back_populates="students")

    def verify_password(self, password: str | bytes):
        return hash.bcrypt.verify(password, self.password)


class Attach(BaseTable):

    __tablename__ = "attatches"

    name: Mapped[str]
    location: Mapped[str]
    type: Mapped[AttachType] = mapped_column(sa.Enum(*get_args(AttachType)))
    user_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("users.id")
    )
    achievement_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("achievements.id")
    )
    property_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("properties.id")
    )


class Email(BaseTable):

    __tablename__ = "emails"

    value: Mapped[str]
    user_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("users.id")
    )
    school_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("schools.id")
    )

    user: Mapped["User"] = relationship(back_populates="emails")


class PhoneNumber(BaseTable):

    __tablename__ = "phone_numbers"

    value: Mapped[str]
    isEmergency: Mapped[bool]
    user_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("users.id")
    )
    school_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("schools.id")
    )

    user: Mapped["User"] = relationship(back_populates="phones")


class Address(BaseTable):

    __tablename__ = "addresses"

    street: Mapped[str]
    number: Mapped[Optional[int]]
    neighborhood: Mapped[Optional[str]]
    city: Mapped[str]
    state: Mapped[char2 | None]
    cep: Mapped[str10 | None]
    user_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("users.id")
    )
    school_id: Mapped[Optional[int]] = mapped_column(
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
    olympic_acronym: Mapped[str]
    year: Mapped[int]
    medal: Mapped[MedalType] = mapped_column(sa.Enum(*get_args(MedalType)))
    link: Mapped[Optional[str]]
    other_info: Mapped[Optional[str]]
    status: Mapped[AchievementStatus] = mapped_column(
        sa.Enum(*get_args(AchievementStatus))
    )
    user_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))

    images: Mapped[Optional[List["Attach"]]] = relationship()


class BankAccount(BaseTable):
    __tablename__ = "bank_accounts"

    bank_number: Mapped[int]
    agency_number: Mapped[int]
    account_number: Mapped[int]
    account_type: Mapped[AccountType] = mapped_column(
        sa.Enum(*get_args(AccountType))
    )
    pix: Mapped[str]
    user = relationship("User", back_populates="bank_account")
