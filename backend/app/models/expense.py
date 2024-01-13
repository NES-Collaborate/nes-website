from typing import Optional

import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseTable
from .user import Attach, User


class ExpenseLog(BaseTable):

    __tablename__ = "expense_logs"

    value: Mapped[float]
    user_id = mapped_column(sa.Integer, sa.ForeignKey("users.id"))
    category_id = mapped_column(sa.Integer,
                                sa.ForeignKey("expense_categories.id"))
    type_id = mapped_column(sa.Integer, sa.ForeignKey("expense_logtypes.id"))
    proof_id = mapped_column(sa.Integer, sa.ForeignKey("attatches.id"))
    comment: Mapped[Optional[str]]
    paidto_id = mapped_column(sa.Integer, sa.ForeignKey("users.id"))

    addedBy: Mapped["User"] = relationship()
    category: Mapped["ExpenseCategory"] = relationship()
    type: Mapped["ExpenseLogType"] = relationship()
    proof: Mapped[Optional["Attach"]] = relationship()
    paidto: Mapped[Optional["User"]] = relationship()


class ExpenseCategory(BaseTable):

    __tablename__ = "expense_categories"

    name: Mapped[str]
    description: Mapped[Optional[str]]


class ExpenseLogType(BaseTable):

    __tablename__ = "expense_logtypes"

    type: Mapped[str]
