from typing import Any, Optional

from app.models.user import Address, Attach, Email, PhoneNumber

from .base import BaseDao


class GeneralDao(BaseDao):

    def create_email(
        self,
        data: dict[str, Any],
        user_id: Optional[int] = None,
        school_id: Optional[int] = None,
    ) -> None:

        _email = self.session.query(Email).filter(Email.value == data["value"]).first()
        if _email:
            return

        _email = Email(**data)
        _email.userId = user_id
        _email.schoolId = school_id
        self.session.add(_email)
        self.session.commit()

    def create_phone_number(
        self,
        data: dict[str, Any],
        user_id: Optional[int] = None,
        school_id: Optional[int] = None,
    ) -> None:

        _phone = (
            self.session.query(PhoneNumber)
            .filter(PhoneNumber.value == data["value"])
            .first()
        )
        if _phone:
            return

        _phone = PhoneNumber(**data)
        _phone.userId = user_id
        _phone.schoolId = school_id
        self.session.add(_phone)
        self.session.commit()

    def create_address(
        self,
        data: dict[str, Any],
        user_id: Optional[int] = None,
        school_id: Optional[int] = None,
    ) -> None:

        _address = Address(**data)
        _address.userId = user_id
        _address.schoolId = school_id
        self.session.add(_address)
        self.session.commit()

    def create_attachment(
        self, data: dict[str, Any], user_id: Optional[int] = None
    ) -> Attach:

        data.pop("id", None)
        _attach = Attach(**data)
        _attach.userId = user_id
        self.session.add(_attach)
        self.session.commit()
        return _attach

    def update_address(self, data: dict[str, Any], user_id: int) -> None:
        _address = self.session.query(Address).filter(Address.userId == user_id).first()
        if _address is None:
            return None
        for key, value in data.items():
            setattr(_address, key, value)
        self.session.commit()

    def update_attachment(self, data: dict[str, Any], user_id: int) -> None:
        _attach = self.session.query(Attach).filter(Attach.id == data.get("id")).first()
        if _attach is None:
            return None
        for key, value in data.items():
            setattr(_attach, key, value)
        self.session.commit()
