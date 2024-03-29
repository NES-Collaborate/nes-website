from datetime import date

from app.models.classroom import Classroom, Subject
from app.models.user import User
from passlib import hash
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from .settings import settings

engine = create_engine(
    settings.DATABASE_URL, connect_args={"check_same_thread": False}
)

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
        "birthdate": date.today(),
        "scholarship": 0,
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


def create_test_student():
    print("Creating test student...")
    session = SessionFactory()

    class_data = {
        "name": "Teste 2024",
    }

    _class = Classroom(**class_data)

    if not session.query(Classroom).filter_by(name=class_data["name"]).first():
        session.add(_class)
        session.commit()
        session.refresh(_class)

    subject_data = {"name": "materia", "classroom_id": 1}

    _subject = Subject(**subject_data)

    if not session.query(Subject).filter_by(name="materia").first():
        session.add(_subject)
        session.commit()
        session.refresh(_subject)

    password = hash.bcrypt.hash("student")
    cpf = "11111111111"

    user_data = {
        "name": "Tercio",
        "password": password,
        "cpf": cpf,
        "birthdate": date.today(),
        "scholarship": 0,
        "type": "student",
        "classroom_id": 1,
    }

    _user = User(**user_data)

    if session.query(User).filter_by(cpf=cpf).first():
        return

    session.add(_user)
    session.commit()
    session.refresh(_user)
    print("Done.")


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
