from io import BytesIO

import pandas as pd
from app.daos.admin import AdminDao
from app.daos.user import UserDao
from app.models.expense import ExpenseCategory, ExpenseLog
from app.models.user import User
from app.schemas.expense import ExpenseLogIn, ExpenseLogOut, ScholarshipPayment
from app.schemas.user import UserPayment
from app.services.db import get_session
from app.services.user import UserService
from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session, aliased

router = APIRouter(prefix="/finance", tags=["finance"])


@router.get("/stats", status_code=status.HTTP_200_OK)
async def get_stats(
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):

    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    return AdminDao(session).get_stats()


@router.get("", status_code=status.HTTP_200_OK)
async def get_finances(
    category: str = "",
    addedBy: str = "",
    paidTo: str = "",
    comment: str = "",
    type: str = "",
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):

    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    paidToUsers = aliased(User)

    results = (
        session.query(ExpenseLog)
        .join(ExpenseCategory, ExpenseLog.category_id == ExpenseCategory.id)
        .join(User, ExpenseLog.user_id == User.id)
    )

    conditions = [
        ExpenseCategory.name.contains(category.strip()),
        ExpenseLog.comment.contains(comment.strip()),
        ExpenseLog.type.contains(type.strip() if type.lower() != "all" else ""),
        User.name.contains(addedBy.strip()),
        ~User.soft_delete,
    ]

    paidTo = paidTo.strip()
    if paidTo:
        results = results.outerjoin(
            paidToUsers, paidToUsers.id == ExpenseLog.paidTo_id
        )
        conditions.append(paidToUsers.name.contains(paidTo.strip()))

    results = results.filter(*conditions)

    expenses = [
        ExpenseLogOut.model_validate(result) for result in results.all()
    ]
    return {"logs": expenses}


@router.get("/download-finances")
async def download_finances(
    category: str = "",
    addedBy: str = "",
    paidTo: str = "",
    comment: str = "",
    type: str = "",
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):

    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    paidToUsers = aliased(User)

    results = (
        session.query(ExpenseLog)
        .join(ExpenseCategory, ExpenseLog.category_id == ExpenseCategory.id)
        .join(User, ExpenseLog.user_id == User.id)
    )

    conditions = [
        ExpenseCategory.name.contains(category.strip()),
        ExpenseLog.comment.contains(comment.strip()),
        ExpenseLog.type.contains(type.strip() if type.lower() != "all" else ""),
        User.name.contains(addedBy.strip()),
        ~User.soft_delete,
    ]

    paidTo = paidTo.strip()
    if paidTo:
        results = results.outerjoin(
            paidToUsers, paidToUsers.id == ExpenseLog.paidTo_id
        )
        conditions.append(paidToUsers.name.contains(paidTo))

    results = results.filter(*conditions)

    buffer = BytesIO()

    df = pd.DataFrame([r.to_json() for r in results.all()])

    with pd.ExcelWriter(buffer, engine="xlsxwriter") as writer:  # type: ignore [buffer is acceptable]
        df.to_excel(writer, index=False, sheet_name="Sheet1")  # type: ignore [to excel exists!]

    return Response(
        buffer.getvalue(),
        headers={
            "Content-Disposition": f'attachment; filename="Finanças NES.xlsx"'
        },
        media_type="application/vnd.ms-excel",
    )


@router.get("/students")
async def get_students(
    year: int,
    month: int,
    classroomId: int,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):

    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    response: list[UserPayment] = []
    _users = UserDao(session).get_by_classroom(classroomId)

    for _user in _users:
        data = UserPayment.model_validate(_user, from_attributes=True)
        if AdminDao(session).get_scholarship_payment(_user.id, year, month):
            data.alreadyPaid = True
        else:
            data.alreadyPaid = False

        response.append(data)

    return response


@router.post("/students/pay")
async def pay_students(
    payment: ScholarshipPayment,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):

    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    for id in payment.ids:
        _user = UserDao(session).get_by_id(id)

        AdminDao(session).create_scholarship_payment(
            current_user, _user, payment.year, payment.month
        )


@router.post("")
async def create_finance(
    expense_log: ExpenseLogIn,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):

    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    _expense = AdminDao(session).create_expense(expense_log, current_user)

    if not _expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Receita não encontrada",
        )

    return {"log": ExpenseLogOut.model_validate(_expense)}


@router.put("/{log_id}")
async def update_finance(
    log_id: int,
    expense: ExpenseLogIn,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
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
