from settings import settings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine(settings.DATABASE_URL,
                       connect_args={"check_same_thread": False})

SessionFactory = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_session():
    session = SessionFactory()
    try:
        yield session
    finally:
        session.close()
