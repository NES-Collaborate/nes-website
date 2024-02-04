from app.models.expense import Balance, ExpenseCategory, ExpenseLog
from app.models.user import Attach, User
from app.schemas.expense import ExpenseLogIn
from fastapi import HTTPException, status
from sqlalchemy import func

from .base import BaseDao


class AdminDao(BaseDao):

    def get_stats(self) -> dict[str, float]:

        _balance = self.session.query(Balance).first()
        _total = self.session.query(func.sum(ExpenseLog.value)).scalar()

        stats = {
            "current_balance": _balance.current if _balance else 0,
            "totalExpenses": _total
        }
        return stats

    def create_expense(self, data: ExpenseLogIn) -> ExpenseLog:

        _expense = ExpenseLog(value=data.value,
                              type=data.type,
                              comment=data.comment)

        if data.addedBy:
            _user = self.session.query(User).get(data.addedBy.id)
            if not _user:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Usuário (AddedBy) não encontrado",
                )

            _expense.addedBy = _user

        if data.paidto:
            _user = self.session.query(User).get(data.paidto.id)
            if _user:
                _expense.paidto = _user

        if data.proof:
            _attach = self.session.query(Attach).get(data.proof.id)
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

        self.session.add(_expense)
        self.session.commit()
        self.session.refresh(_expense)
        return _expense

    def update_expense(self, data: ExpenseLogIn, id: int) -> ExpenseLog | None:

        _expense = self.session.query(ExpenseLog).get(id)

        if _expense is None:
            return None

        _expense.value = data.value
        _expense.type = data.type
        _expense.comment = data.comment

        if data.paidto:
            _user = self.session.query(User).get(data.paidto.id)
            if _user:
                _expense.paidto = _user

        if data.proof:
            _attach = self.session.query(Attach).get(data.proof.id)
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
