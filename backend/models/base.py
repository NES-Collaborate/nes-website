from datetime import datetime, timezone
from typing import Annotated, Optional

import sqlalchemy as sa
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class BaseTable(DeclarativeBase):

    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True)
    created_at: Mapped[Optional[datetime]] = mapped_column(
        sa.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[Optional[datetime]] = mapped_column(sa.DateTime)


char2 = Annotated[str, 2]
str10 = Annotated[str, 10]
