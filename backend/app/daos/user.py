from datetime import datetime
from typing import Any

from app.daos.base import BaseDao
from app.models.user import User
from fastapi import HTTPException
from passlib import hash

from .general import GeneralDao


class UserDao(BaseDao):

    def create(self, user_data: dict[str, Any]) -> User | None:
        user_data.update(birthdate=datetime.strptime(user_data["birthdate"],
                                                     "%d/%m/%Y").date())
        _user = User(
            name=user_data["name"],
            type=user_data["type"],
            cpf=user_data["cpf"],
            birthdate=user_data["birthdate"],
            scholarship=user_data["scholarship"],
            serie=user_data["serie"],
        )

        _user.password = hash.bcrypt.hash(user_data["password"])
        self.session.add(_user)
        self.session.commit()

        for email in user_data["emails"]:
            GeneralDao(self.session).create_email(email, _user.id)

        for phone in user_data["phones"]:
            GeneralDao(self.session).create_phone_number(phone, _user.id)

        GeneralDao(self.session).create_address(user_data["address"], _user.id)

        GeneralDao(self.session).create_attachment(user_data["photo"],
                                                   _user.id)

        self.session.refresh(_user)
        return _user

    def get_by_id(self, id: int):
        _user = self.session.query(User).filter(User.id == id).first()

        if not _user:
            raise HTTPException(status_code=404,
                                detail="Usuário não encontrado")

        return _user

    def get_by_classroom(self, classroomId: int) -> list[User]:
        _users = self.session.query(User).filter(
            User.classroom_id == classroomId).all()

        if not _users:
            raise HTTPException(status_code=404,
                                detail="Nenum usuário encontrado")

        return _users

    def get_by_cpf(self, cpf: str | None):

        _user = self.session.query(User).filter(User.cpf == cpf).first()

        if not _user:
            raise HTTPException(status_code=404,
                                detail="Usuário não encontrado")

        return _user

    def update(self, user_data: dict[str, Any], user_id: int) -> User | None:
        _user = self.get_by_id(user_id)

        if user_data.get("emails"):
            for email in user_data["emails"]:
                GeneralDao(self.session).create_email(email, _user.id)

        if user_data.get("phones"):
            for phone in user_data["phones"]:
                GeneralDao(self.session).create_phone_number(phone, _user.id)

        if user_data.get("address"):
            GeneralDao(self.session).update_address(user_data["address"],
                                                    _user.id)

        if user_data.get("photo"):
            GeneralDao(self.session).update_attachment(user_data["photo"],
                                                       _user.id)

        UPDATED_KEYS = [
            "name",
            "type",
            "cpf",
            "birthdate",
            "scholarship",
            "serie",
        ]

        for key, value in user_data.items():
            if key in UPDATED_KEYS:
                setattr(_user, key, value)

        if user_data.get("password"):
            _user.password = hash.bcrypt.hash(user_data["password"])

        self.session.commit()
        self.session.refresh(_user)
        return _user

    def delete_by_id(self, id: int):
        _user = self.get_by_id(id)

        for email in _user.emails:  # type: ignore
            self.session.delete(email)

        for phone in _user.phones:  # type: ignore
            self.session.delete(phone)

        self.session.delete(_user.address)
        self.session.delete(_user.photo)

        self.session.delete(_user)
        self.session.commit()
