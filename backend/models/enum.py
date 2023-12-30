from sqlalchemy import Enum

class Serie(Enum):
    EF_9 = '9º EF'
    EM_1 = '1º EM'
    EM_2 = '2º EM'
    EM_3 = '3º EM'

class AttatchTypes(Enum):

    FILE = "file"
    LINK = "link"

class UserType(Enum):

    ADMIN = "admin"
    USER = "user"
    STUDENT = "student"
    RESPONSIBLE = "responsible"