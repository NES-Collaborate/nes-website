from abc import ABC

from sqlalchemy.orm import Session


class BaseDao(ABC):
    def __init__(self, session: Session):
        self.session = session
