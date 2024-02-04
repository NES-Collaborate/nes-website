from app.daos.admin import AdminDao
from app.models.expense import ExpenseLog
from app.models.user import User
from app.schemas.expense import ExpenseLogIn, ExpenseLogOut
from app.services.db import get_session
from app.services.user import UserService
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/finance", tags=["finance"])


@router.get("/stats", status_code=status.HTTP_200_OK)
def get_stats(current_user: User = Depends(UserService.get_current_user),
              session: Session = Depends(get_session)):

    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    return AdminDao(session).get_stats()


@router.get("", status_code=status.HTTP_200_OK)
def get_finances(current_user: User = Depends(UserService.get_current_user),
                 session: Session = Depends(get_session)):

    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    results = session.query(ExpenseLog).all()
    expenses = [ExpenseLogOut.model_validate(result) for result in results]
    return {"logs": expenses}


@router.post("")
def create_finance(expense_log: ExpenseLogIn,
                   current_user: User = Depends(UserService.get_current_user),
                   session: Session = Depends(get_session)):

    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    _expense = AdminDao(session).create_expense(expense_log)

    if not _expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Receita não encontrada",
        )

    return {"log": ExpenseLogOut.model_validate(_expense)}


@router.put("/{log_id}")
def update_finance(log_id: int,
                   expense: ExpenseLogIn,
                   current_user: User = Depends(UserService.get_current_user),
                   session: Session = Depends(get_session)):
    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    _expense = AdminDao(session).update_expense(expense, log_id)

    if not _expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Receita não encontrada",
        )

    return {"log": ExpenseLogOut.model_validate(_expense)}
