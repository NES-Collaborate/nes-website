from .base import BaseTable
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .user import User 
from .classroom import Classroom
import sqlalchemy as sa 

class Enrollment(BaseTable): 
    __tablename__ = "enrollments"
    user_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))
    classroom_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("classrooms.id"))
    user: Mapped["User"] = relationship("User", back_populates="classrooms")
    classroom: Mapped["Classroom"] = relationship("Classroom", back_populates="members")
    classroom: Mapped["Classroom"] = relationship("Classroom", back_populates="members")