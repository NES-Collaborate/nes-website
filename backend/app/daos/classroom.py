from app.models.classroom import Classroom
from app.models.relationships import Enrollment
from app.models.user import User
from fastapi import HTTPException

from .base import BaseDao


class ClassroomDao(BaseDao):

    def get_by_id(self, classroomId: int) -> Classroom:

        _classroom = self.session.query(Classroom).filter_by(id=classroomId).first()

        if not _classroom:
            raise HTTPException(status_code=404, detail="Turma não encontrada")

        return _classroom

    def get_members_by_id(
        self, classroomId: int, page: int, page_size: int
    ) -> list[User]:

        _classroom = self.get_by_id(classroomId)

        _members = (
            self.session.query(User)
            .join(Enrollment, Enrollment.userId == User.id)
            .filter(Enrollment.classroomId == _classroom.id)
            .limit(page_size)
            .offset((page - 1) * page_size)
            .all()
        )

        return _members

    def is_member(self, userId: int, classroomId: int) -> bool:

        _enrollment = (
            self.session.query(Enrollment)
            .filter_by(userId=userId, classroomId=classroomId)
            .first()
        )

        if not _enrollment:
            return False

        return True

    def create_enrollment(self, userId: int, classroomId: int, role: str) -> Enrollment:

        _enrollment = Enrollment(userId=userId, classroomId=classroomId, role=role)

        self.session.add(_enrollment)
        self.session.commit()
        self.session.refresh(_enrollment)

        return _enrollment

    def delete_enrollment(self, userId: int, classroomId: int) -> None:

        self.session.query(Enrollment).filter_by(
            userId=userId, classroomId=classroomId
        ).delete()
        self.session.commit()
