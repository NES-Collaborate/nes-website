from daos.base import BaseDao
from models.user import User
from sqlalchemy.orm import Session


class UserDao(BaseDao):

    def __init__(self, session: Session):
        super().__init__(session)

    def create(self, user_data):
        _user = User(**user_data)
        self.session.add(_user)
        self.session.commit()
        self.session.refresh(_user)
        return _user

    def get_by_id(self, id):
        return self.session.query(User).filter(User.id == id).first()

    def get_by_cpf(self, cpf):
        return self.session.query(User).filter(User.cpf == cpf).first()
