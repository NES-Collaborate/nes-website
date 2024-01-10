from typing import List, Optional, get_args
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseTable
from .user import User, Attach


class ExpenseLog(BaseTable):

    __tablename__ = "expenselogs"

    value: Mapped[float]
    addedBy: Mapped["User"] = relationship()
    category: Mapped["ExpenseCategory"] = relationship()
    type: Mapped["ExpenseLogType"] = relationship()
    proof: Mapped[Optional["Attach"]] = relationship()
    comment: Mapped[Optional[str]]
    paidto: Mapped[Optional["User"]] = relationship()
class ExpenseCategory(BaseTable):

    __tablename__ = "expensecategories"

    name: Mapped[str]
    description: Mapped[Optional[str]]

class ExpenseLogType(BaseTable):

    __tablename__ = "expenselogtypes"

    type: Mapped[str]