from datetime import datetime, timezone
from typing import Annotated, Optional

import sqlalchemy as sa
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class AddedByMixin(object):

    addedById: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))
    addedBy = relationship("User")


class BaseTable(AddedByMixin, DeclarativeBase):

    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True)
    createdAt: Mapped[Optional[datetime]] = mapped_column(
        sa.DateTime, default=lambda: datetime.now(timezone.utc)
    )
    updatedAt: Mapped[Optional[datetime]] = mapped_column(sa.DateTime)


char2 = Annotated[str, 2]
str10 = Annotated[str, 10]
