from .base import BaseTable
from sqlalchemy import Column, Enum, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship


class Serie(Enum):
    EF_9 = '9º EF'
    EM_1 = '1º EM'
    EM_2 = '2º EM'
    EM_3 = '3º EM'

class User(BaseTable):
    pass