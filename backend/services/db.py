from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from .settings import settings

engine = create_engine(settings.DATABASE_URL,
                       connect_args={"check_same_thread": False})

SessionFactory = sessionmaker(autocommit=False, autoflush=False, bind=engine)


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
