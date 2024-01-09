import sqlalchemy as sa
from fastapi import APIRouter, Depends, HTTPException, status
from models.admin import Property
from models.user import User
from schemas.admin import PropertyIn, PropertyOut
from services.db import get_session
from services.user import UserService
from sqlalchemy.orm import Session

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/property", status_code=status.HTTP_200_OK)
async def get_properties(
        current_user: User = Depends(UserService.get_current_user),
        session: Session = Depends(get_session),
        q: str | None = None):

    if current_user.type != "admin":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Usuário não autorizado")

    if not q:
        results = session.query(Property).all()
    else:
        results = session.query(Property).filter(
            sa.or_(Property.id.like(f"%{q}%"), Property.name.like(f"%{q}%"),
                   Property.loanedTo.has(User.name.like(f"%{q}%")))).all()

    properties = [PropertyOut.model_validate(result) for result in results]

    return {"properties": properties}


@router.post("/property")
async def create_property(
        property: PropertyIn,
        current_user: User = Depends(UserService.get_current_user),
        session: Session = Depends(get_session),
):

    if current_user.type != "admin":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Usuário não autorizado")

    _property = Property(**property.model_dump())

    session.add(_property)
    session.commit()
    session.refresh(_property)

    return {"property": PropertyOut.model_validate(_property)}


@router.put("/property/{property_id}")
async def update_property(
        property_id: int,
        property: PropertyIn,
        current_user: User = Depends(UserService.get_current_user),
        session: Session = Depends(get_session),
):

    if current_user.type != "admin":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Usuário não autorizado")

    _property = session.query(Property).get(property_id)

    if not _property:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Propriedade não encontrada")

    _property.name = property.name
    _property.type = property.type
    session.add(_property)
    session.commit()
    session.refresh(_property)

    return {"property": PropertyOut.model_validate(_property)}


@router.delete("/property/{property_id}")
async def delete_property(
        property_id: int,
        current_user: User = Depends(UserService.get_current_user),
        session: Session = Depends(get_session),
):

    if current_user.type != "admin":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Usuário não autorizado")

    _property = session.query(Property).get(property_id)

    if not _property:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Propriedade não encontrada")

    session.delete(_property)
    session.commit()

    return {"message": f"Propriedade com id {property_id} deletada"}
