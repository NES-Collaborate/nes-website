from abc import ABC, abstractmethod
from typing import Any

from app.models.user import User
from sqlalchemy.orm import Session

from models.user import User


class BaseDao(ABC):

    def __init__(self, session: Session):
        self.session = session

    @abstractmethod
    def create(self, user_data: Any) -> User | None:
        pass

    @abstractmethod
    def get_by_id(self, id: int) -> User | None:
        pass
