from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from .user import UserMinimal, UserPoster


class PropertyBase(BaseModel):
    name: str
    type: str

    class Config:
        from_attributes = True


class PropertyOut(PropertyBase):
    id: int
    loanedTo: Optional[UserPoster]
    loanedAt: Optional[datetime]


class PropertyIn(PropertyBase):
    loanedTo: Optional[UserMinimal]
