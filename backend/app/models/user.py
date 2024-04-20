from datetime import date
from typing import List, Optional, get_args

import sqlalchemy as sa
from passlib import hash  # type: ignore
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .classroom import Post, Message, Serie
from .enrollment import Enrollment
from .base import BaseTable, char2, str10
from .enum import (
    AttachType,
    UserType,
)


class User(BaseTable):

    __tablename__ = "users"

    name: Mapped[str]
    photo: Mapped[Optional["Attach"]] = relationship("Attach", back_populates="user") 
    password: Mapped[str]
    cpf: Mapped[str] = mapped_column(sa.String, unique=True, index=True)
    birth: Mapped[date] 
    address: Mapped["Address"] = relationship("Address") 
    type: Mapped[UserType] = mapped_column(sa.Enum(*get_args(UserType)))
    student: Mapped[Optional["Student"]] = relationship("Student", back_populates="users", uselist=False)
    classrooms: Mapped[List["Enrollment"]] = relationship("Enrollment", back_populates="user")
    posts: Mapped[List["Post"]] = relationship("Post", back_populates="user") 
    received: Mapped[List["Message"]] = relationship("Message", back_populates="to", foreign_keys="Message.to_id")
    sent: Mapped[List["Message"]] = relationship("Message", back_populates="from_", foreign_keys="Message.from_id")
    
    

    def verify_password(self, password: str | bytes):
        return hash.bcrypt.verify(password, self.password)




    
   



class Student(BaseTable):

    __tablename__ = "students"

    user: Mapped["User"] = relationship("User", back_populates="student")
    user_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("users.id")
    )

    serie: Mapped["Serie"] = relationship("Serie", back_populates="student")  
    serie_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("series.id")
    )  
    scolarshipValue: Mapped[float]
    """achievements: Mapped[List["Achievement"]] = relationship("Achievement", back_populates="students") 
    achievements_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("achievements.id")
    )"""
    responsibleName: Mapped[str]
    responsibleNumber: Mapped[str]

class Attach(BaseTable):

    __tablename__ = "attatches"

    name: Mapped[str]
    location: Mapped[str]
    type: Mapped[AttachType] = mapped_column(sa.Enum(*get_args(AttachType)))
    
    user_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("users.id")
    )
    
    #achievement_id: Mapped[Optional[int]] = mapped_column(sa.Integer, sa.ForeignKey("achievements.id") )
    property_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("properties.id")
    )

    classroom_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("classrooms.id")
    )


"""class Email(BaseTable):

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

"""
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


"""class School(BaseTable):

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
    other_info: Mapped[Optional[str]]
    status: Mapped[AchievementStatus] = mapped_column(
        sa.Enum(*get_args(AchievementStatus))
    )
    student: Mapped["Student"] = relationship("Student", back_populates="achievements")

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
"""