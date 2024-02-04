from typing import Optional

from app.models.enum import ExpenseLogType
from pydantic import BaseModel

from .user import Attatch, UserMinimal


class ExpenseLogCategory(BaseModel):

    id: int
    name: str
    description: str

    class Config:
        from_attributes = True


class ExpenseLogBase(BaseModel):

    value: float
    addedBy: UserMinimal
    category: ExpenseLogCategory
    type: ExpenseLogType
    proof: Optional[Attatch]
    comment: Optional[str]
    paidto: Optional[UserMinimal]

    class Config:
        from_attributes = True


class ExpenseLogIn(ExpenseLogBase):

    pass


class ExpenseLogOut(ExpenseLogBase):

    id: int


class Balance(BaseModel):

    current: float

    class Config:
        from_attributes = True
