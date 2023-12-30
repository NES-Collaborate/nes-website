from abc import ABC, abstractmethod

from models.user import User
from sqlalchemy.orm import Session


class BaseDao(ABC):

    def __init__(self, session: Session):
        self.session = session

    @abstractmethod
    def create(self, user_data: dict[str, str]) -> User | None:
        pass

    @abstractmethod
    def get_by_id(self, id: int) -> User | None:
        pass
