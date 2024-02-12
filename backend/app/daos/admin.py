from datetime import datetime

from app.models.expense import ExpenseCategory, ExpenseLog
from app.models.user import Attach, User
from app.schemas.expense import ExpenseLogIn
from fastapi import HTTPException, status
from sqlalchemy import func

from .base import BaseDao


class AdminDao(BaseDao):

    def get_stats(self) -> dict[str, float]:

        _total_removed = self.session.query(func.sum(
            ExpenseLog.value)).filter_by(type="Removal").scalar()
        _total_deposited = self.session.query(func.sum(
            ExpenseLog.value)).filter_by(type="Deposit").scalar() or 0

        stats = {
            "currentBalance": (_total_deposited or 0) - (_total_removed or 0),
            "totalExpenses": (_total_removed or 0)
        }
        return stats  # type: ignore [dict[str, int]]

    def create_expense(self, data: ExpenseLogIn, addedBy: User) -> ExpenseLog:

        _expense = ExpenseLog(value=data.value,
                              type=data.type,
                              comment=data.comment,
                              addedBy=addedBy)

        if data.proof:
            _attach = self.session.query(Attach).get(data.proof)
            if _attach:
                _expense.proof = _attach

        if data.category:
            _category = self.session.query(ExpenseCategory).filter_by(
                name=data.category.name).first()
            if not _category:
                _category = ExpenseCategory(
                    name=data.category.name,
                    description=data.category.description)

            _expense.category = _category

        self.session.add(_expense)
        self.session.commit()
        self.session.refresh(_expense)
        return _expense

    def get_scholarship_payment(self, id: int, year: int,
                                month: int) -> ExpenseLog | None:

        _result = self.session.query(ExpenseLog).filter(
            (ExpenseLog.paidto_id == id)
            & (func.extract("month", ExpenseLog.createdAt) == month)
            & (func.extract("year", ExpenseLog.createdAt) == year)).first()

        return _result

    def create_scholarship_payment(self, addedBy: User, paidTo: User,
                                   year: int, month: int):

        _result = self.get_scholarship_payment(paidTo.id, year, month)

        if _result: return

        created_at = datetime(year, month, 1)
        _payment = ExpenseLog(value=paidTo.scholarship,
                              type="Removal",
                              addedBy=addedBy,
                              paidto=paidTo,
                              comment=f"Pagamento de {month}-{year}",
                              createdAt=created_at)

        _category = self.session.query(ExpenseCategory).filter_by(
            name="Pagamento de Bolsa").first()
        if not _category:
            _category = ExpenseCategory(name="Pagamento de Bolsa")

        _payment.category = _category

        self.session.add(_payment)
        self.session.commit()

    def update_expense(self, data: ExpenseLogIn, id: int) -> ExpenseLog | None:

        _expense = self.session.query(ExpenseLog).get(id)

        if _expense is None:
            return None

        _expense.value = data.value
        _expense.type = data.type
        _expense.comment = data.comment

        if data.proof:
            _attach = self.session.query(Attach).get(data.proof)
            if _attach:
                _expense.proof = _attach

        if data.category:
            _category = self.session.query(ExpenseCategory).get(
                data.category.id)
            if not _category:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Categoria não encontrada",
                )

            _expense.category = _category

        self.session.commit()
        self.session.refresh(_expense)
        return _expense