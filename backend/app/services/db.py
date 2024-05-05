from datetime import date

from app.models.user import User
from passlib import hash
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from .settings import settings

engine = create_engine(settings.DATABASE_URL, connect_args={"check_same_thread": False})

SessionFactory = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def create_default_user():
    print("Creating default user...")
    _password = "admin"
    # TODO: uncomment this line to generate a random admin password
    # _password = "".join(random.choices(string.ascii_lowercase + string.digits, k=10))
    password = hash.bcrypt.hash("admin")
    cpf = "00000000000"

    user_data = {
        "name": "Admin",
        "password": password,
        "cpf": cpf,
        "birth": date.today(),
        "type": "admin",
    }

    _user = User(**user_data)

    session = SessionFactory()

    if session.query(User).filter_by(cpf=cpf).first():
        print("User already exists. Skipping...")
        return

    session.add(_user)
    session.commit()
    session.refresh(_user)
    print("User created!")
    print(f"\tCPF: {_user.cpf}\n\tPassword: {_password}")


def get_session():
    """Get DB Session

    Yields:
        session: DB Session to use
    """
    session = SessionFactory()
    try:
        yield session
    finally:
        session.close()
