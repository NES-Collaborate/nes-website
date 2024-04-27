from typing import Optional, get_args

import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseTable
from .enum import Role


class Enrollment(BaseTable):
    __tablename__ = "enrollments"

    userId: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))
    classroomId: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("classrooms.id"))
    user = relationship("User", back_populates="classrooms", foreign_keys=[userId])
    classroom = relationship(
        "Classroom", back_populates="members", foreign_keys=[classroomId]
    )
    role: Mapped[Role] = mapped_column(sa.Enum(*get_args(Role)))


class ActivityGroup(BaseTable):

    __tablename__ = "activity_groups"

    classroom_id: Mapped[Optional[int]] = mapped_column(
        sa.Integer, sa.ForeignKey("classrooms.id")
    )
    classroom = relationship("Classroom", back_populates="activityGroups")
    activities = relationship("Activity", back_populates="activityGroup", uselist=True)
    isRecovery: Mapped[bool]
