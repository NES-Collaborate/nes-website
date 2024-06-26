from datetime import datetime
from typing import Any

from fastapi import HTTPException
from passlib import hash

from app.daos.base import BaseDao
from app.models.relationships import Enrollment
from app.models.user import Student, User

from .general import GeneralDao


class UserDao(BaseDao):
    def _create_user(self, user_data: dict[str, Any]) -> User:
        user_data.update(
            birth=datetime.strptime(user_data["birth"], "%d/%m/%Y").date()
        )
        _user = User(
            name=user_data["name"],
            type=user_data["type"],
            cpf=user_data["cpf"],
            birth=user_data["birth"],
        )

        _user.password = hash.bcrypt.hash(user_data["password"])
        self.session.add(_user)
        self.session.commit()
        self.session.refresh(_user)

        if user_data.get("emails"):
            for email in user_data["emails"]:
                GeneralDao(self.session).create_email(email, _user.id)

        if user_data.get("phones"):
            for phone in user_data["phones"]:
                GeneralDao(self.session).create_phone_number(phone, _user.id)

        if user_data.get("address"):
            GeneralDao(self.session).create_address(user_data["address"], _user.id)

        if user_photo := user_data.get("photo"):
            GeneralDao(self.session).create_attachment(user_photo, _user.id)

        self.session.refresh(_user)
        return _user

    def create_admin(self, user_data: dict[str, Any]) -> User | None:
        return self._create_user(user_data)

    def create_other(self, user_data: dict[str, Any]) -> User | None:
        return self._create_user(user_data)

    def create_student(self, user_data: dict[str, Any]) -> User | None:
        _user = self._create_user(user_data)

        _student = Student(
            userId=_user.id,
            scholarshipValue=user_data["scholarshipValue"],
            responsibleName=user_data["responsibleName"],
            responsibleNumber=user_data["responsibleNumber"],
        )

        self.session.add(_student)
        self.session.commit()

        self.session.refresh(_user)
        return _user

    def get_by_id(self, id: int):
        _user = (
            self.session.query(User)
            .filter(User.id == id, ~User.softDelete)
            .first()
        )

        if not _user:
            raise HTTPException(
                status_code=404, detail="Usuário não encontrado"
            )

        return _user

    def get_by_classroom(self, classroomId: int) -> list[User]:
        _users = (
            self.session.query(User)
            .join(Enrollment, User.id == Enrollment.userId)
            .filter(Enrollment.classroomId == classroomId, ~User.softDelete)
            .all()
        )

        if not _users:
            raise HTTPException(
                status_code=404, detail="Nenum usuário encontrado"
            )

        return _users

    def get_by_cpf(self, cpf: str | None):
        _user = (
            self.session.query(User)
            .filter(User.cpf == cpf, ~User.softDelete)
            .first()
        )

        if not _user:
            raise HTTPException(
                status_code=404, detail="Usuário não encontrado"
            )

        return _user

    def update(self, user_data: dict[str, Any], user_id: int) -> User:
        _user = self.get_by_id(user_id)

        if user_data.get("emails"):
            for email in user_data["emails"]:
                GeneralDao(self.session).create_email(email, _user.id)

        if user_data.get("email"):
            GeneralDao(self.session).create_email(user_data["email"], _user.id)

        if user_data.get("phones"):
            for phone in user_data["phones"]:
                GeneralDao(self.session).create_phone_number(phone, _user.id)

        if user_data.get("address"):
            GeneralDao(self.session).update_address(
                user_data["address"], _user.id
            )

        if user_data.get("photo"):
            user_data["photo"] = GeneralDao(self.session).create_attachment(
                user_data["photo"]
            )

        if user_data.get("birth"):
            user_data["birth"] = datetime.strptime(
                user_data["birth"], "%d/%m/%Y"
            ).date()

        UPDATED_USER_KEYS = [
            "name",
            "type",
            "cpf",
            "birth",
            "photo",
        ]

        UPDATED_STUDENT_KEYS = [
            "scholarshipValue",
            "responsibleName",
            "responsibleNumber",
        ]

        for key, value in user_data.items():
            if key in UPDATED_USER_KEYS:
                setattr(_user, key, value)
            if key in UPDATED_STUDENT_KEYS:
                setattr(_user.student, key, value)

        if user_data.get("password"):
            _user.password = hash.bcrypt.hash(user_data["password"])

        self.session.commit()
        self.session.refresh(_user)
        return _user

    def delete_by_id(self, id: int):
        _user = self.get_by_id(id)
        
        for collection in ["phones", "emails"]:
            itens = getattr(_user, collection, None)
            if itens:
                for item in itens:
                    self.session.delete(item)
        
        for attribute in ["address", "photo", "student"]:
            item = getattr(_user, attribute, None)
            if item:
                self.session.delete(item)

        self.session.delete(_user)
        self.session.commit()

    def soft_delete_by_id(self, id: int):
        _user = self.get_by_id(id)
        _user.softDelete = True
        self.session.commit()
        self.session.refresh(_user)
        return _user
