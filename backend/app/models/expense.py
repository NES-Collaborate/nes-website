from typing import Optional, get_args

import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseTable
from .enum import ExpenseLogType
from .user import Attach, User


class ExpenseLog(BaseTable):

    __tablename__ = "expense_logs"

    value: Mapped[float]
    categoryId: Mapped[int] = mapped_column(
        sa.Integer, sa.ForeignKey("expense_categories.id")
    )
    proofId: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("attatches.id")
    )
    type: Mapped[ExpenseLogType] = mapped_column(sa.Enum(*get_args(ExpenseLogType)))
    comment: Mapped[Optional[str]]
    paidToId: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("users.id")
    )

    category: Mapped["ExpenseCategory"] = relationship()
    proof: Mapped[Optional["Attach"]] = relationship()
    paidTo: Mapped[Optional["User"]] = relationship(foreign_keys=[paidToId])

    def to_json(self):
        type_mapper = {"deposit": "entrada", "removal": "saida"}
        data = {
            "Valor": self.value,
            "Usuario": f"{self.addedBy.name} ({self.addedBy.id})",
            "Categoria": f"{self.category.name} ({self.category.id})",
            "Comprovante": (
                f"{self.proof.location} ({self.proof.type})" if self.proof else ""
            ),
            "Tipo": type_mapper[self.type],
            "Observação": getattr(self, "comment", "Nada"),
            "Pago Para": (
                f"{self.paidTo.name} ({self.paidTo.id})" if self.paidTo else ""
            ),
        }

        return data


class ExpenseCategory(BaseTable):

    __tablename__ = "expense_categories"

    name: Mapped[str]
    description: Mapped[Optional[str]]
