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
            "currentBalance": _balance.current if _balance else 0,
            "totalExpenses": _total if _total else 0
        }
        return stats

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

    def get_scolarship_payment(self, id: int, year: int,
                               month: int) -> ExpenseLog | None:

        _result = self.session.query(ExpenseLog).filter(
            (ExpenseLog.paidto_id == id)
            & (func.extract("month", ExpenseLog.createdAt) == month)
            & (func.extract("year", ExpenseLog.createdAt) == year)).first()

        return _result

    def create_scolarship_payment(self, addedBy: User, paidTo: User, year: int,
                                  month: int):

        _result = self.get_scolarship_payment(paidTo.id, year, month)

        if _result: return

        _payment = ExpenseLog(value=paidTo.scholarship,
                              type="Deposit",
                              addedBy=addedBy,
                              paidTo=paidTo,
                              comment=f"Pagamento de {month}-{year}")

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
