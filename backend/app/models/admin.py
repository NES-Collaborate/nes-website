from datetime import datetime
from typing import Optional

import sqlalchemy as sa  # type: ignore
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseTable
from .user import Attach, User


class Property(BaseTable):

    __tablename__ = "properties"

    name: Mapped[str]
    photo: Mapped["Attach"] = relationship()
    type: Mapped[str]
    user_id: Mapped[Optional[int]] = mapped_column(sa.Integer,
                                                   sa.ForeignKey("users.id"))
    loanedTo: Mapped[Optional["User"]] = relationship()
    loanedAt: Mapped[Optional[datetime]]
