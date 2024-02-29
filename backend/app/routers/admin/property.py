from datetime import datetime

import sqlalchemy as sa
from app.daos.user import UserDao
from app.models.admin import Property
from app.models.user import User
from app.schemas.admin import PropertyIn, PropertyOut
from app.services.db import get_session
from app.services.user import UserService
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/property", tags=["property"])


@router.get("", status_code=status.HTTP_200_OK)
async def get_properties(
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
    q: str | None = None,
):
    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    if not q:
        results = session.query(Property).all()
    else:
        results = (
            session.query(Property)
            .filter(
                sa.or_(
                    Property.id.like(f"%{q}%"),
                    Property.name.like(f"%{q}%"),
                    Property.loanedTo.has(User.name.like(f"%{q}%")),
                )
            )
            .all()
        )

    properties = [PropertyOut.model_validate(result) for result in results]

    return {"properties": properties}


@router.post("")
async def create_property(
    property: PropertyIn,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    _property = Property(**property.model_dump())

    if property.loanedTo:
        _user = UserDao(session).get_by_id(property.loanedTo.id)

        _property.loanedTo = _user
        _property.loanedAt = datetime.now()

    session.add(_property)
    session.commit()
    session.refresh(_property)

    return {"property": PropertyOut.model_validate(_property)}


@router.put("/{property_id}")
async def update_property(
    property_id: int,
    property: PropertyIn,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    _property = session.query(Property).get(property_id)

    if not _property:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Propriedade não encontrada",
        )

    if property.loanedTo:
        _user = UserDao(session).get_by_id(property.loanedTo.id)

        if _property.loanedTo:
            if _property.loanedTo.id != _user.id:
                _property.loanedTo = _user
                _property.loanedAt = datetime.now()
        else:
            _property.loanedTo = _user
            _property.loanedAt = datetime.now()
    elif not property.loanedTo and _property.loanedTo:
        _property.loanedTo = None
        _property.loanedAt = None

    _property.name = property.name
    _property.type = property.type

    session.add(_property)
    session.commit()
    session.refresh(_property)

    return {"property": PropertyOut.model_validate(_property)}


@router.delete("/{property_id}")
async def delete_property(
    property_id: int,
    current_user: User = Depends(UserService.get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.type != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário não autorizado",
        )

    _property = session.query(Property).get(property_id)

    if not _property:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Propriedade não encontrada",
        )

    session.delete(_property)
    session.commit()

    return {"message": f"Propriedade com id {property_id} deletada"}
