from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from settings import settings

engine = create_engine(settings.DATABASE_URL, connect_args={"check_same_thread": False})

SessionFactory = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine)


