import sqlalchemy as sa

from .base import BaseTable

teacher_subject = sa.Table(
    "teacher_subject",
    BaseTable.metadata,
    sa.Column("teacher_id",
              sa.Integer,
              sa.ForeignKey("users.id"),
              primary_key=True),
    sa.Column("subject_id",
              sa.Integer,
              sa.ForeignKey("subjects.id"),
              primary_key=True),
)
