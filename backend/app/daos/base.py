from abc import ABC, abstractmethod
from typing import Any

from sqlalchemy.orm import Session


class BaseDao(ABC):

    def __init__(self, session: Session):
        self.session = session

    @abstractmethod
    def create(self, user_data: Any) -> Any | None:
        pass

    @abstractmethod
    def get_by_id(self, id: int) -> Any | None:
        pass
