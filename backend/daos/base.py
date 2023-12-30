from abc import ABC, abstractmethod

from sqlalchemy.orm import Session


class BaseDao(ABC):

    def __init__(self, session: Session):
        self.session = session

    @abstractmethod
    def create(self, request):
        pass

    @abstractmethod
    def get_by_id(self, id):
        pass
