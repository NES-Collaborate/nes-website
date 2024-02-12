from typing import Optional, get_args

import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseTable
from .enum import ExpenseLogType
from .user import Attach, User


class ExpenseLog(BaseTable):

    __tablename__ = "expense_logs"

    value: Mapped[float]
    user_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))
    category_id: Mapped[int] = mapped_column(
        sa.Integer, sa.ForeignKey("expense_categories.id"))
    proof_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("attatches.id"))
    type: Mapped[ExpenseLogType] = mapped_column(
        sa.Enum(*get_args(ExpenseLogType)))
    comment: Mapped[Optional[str]]
    paidto_id: Mapped[Optional[int]] = mapped_column(sa.Integer,
                                                     sa.ForeignKey("users.id"))

    addedBy: Mapped["User"] = relationship(foreign_keys=[user_id])
    category: Mapped["ExpenseCategory"] = relationship()
    proof: Mapped[Optional["Attach"]] = relationship()
    paidto: Mapped[Optional["User"]] = relationship(foreign_keys=[paidto_id])


class ExpenseCategory(BaseTable):

    __tablename__ = "expense_categories"

    name: Mapped[str]
    description: Mapped[Optional[str]]
