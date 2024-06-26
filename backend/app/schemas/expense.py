from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from app.models.enum import ExpenseLogType
from app.schemas.user import Attach

from .user import UserMinimal


class ExpenseLogCategory(BaseModel):
    id: int
    name: str
    description: Optional[str]

    class Config:
        from_attributes = True


class ExpenseLogBase(BaseModel):
    value: float
    category: ExpenseLogCategory
    type: ExpenseLogType
    comment: Optional[str]

    class Config:
        from_attributes = True


class ExpenseLogIn(ExpenseLogBase):
    proof: Optional[int]
    pass


class ScholarshipPayment(BaseModel):
    ids: list[int]
    month: int
    year: int

    class Config:
        from_attributes = True


class ExpenseLogOut(ExpenseLogBase):
    proof: Optional[Attach]
    addedBy: UserMinimal
    paidTo: Optional[UserMinimal]
    id: int
    createdAt: datetime


class Balance(BaseModel):
    current: float

    class Config:
        from_attributes = True
