"""

Revision ID: cdde474ee3d4
Revises:
Create Date: 2024-02-29 18:55:52.778062

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'cdde474ee3d4'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bank_accounts',
    sa.Column('bank_number', sa.Integer(), nullable=False),
    sa.Column('agency_number', sa.Integer(), nullable=False),
    sa.Column('account_number', sa.Integer(), nullable=False),
    sa.Column('account_type', sa.Enum('Conta Corrente', 'Conta Poupança'), nullable=False),
    sa.Column('pix', sa.String(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('classrooms',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('expense_categories',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('penalties',
    sa.Column('angularCoefficient', sa.Float(), nullable=False),
    sa.Column('linearCoefficient', sa.Float(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('schools',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('subjects',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('classroom_id', sa.Integer(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['classroom_id'], ['classrooms.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('cpf', sa.String(), nullable=False),
    sa.Column('birthdate', sa.Date(), nullable=False),
    sa.Column('scholarship', sa.Float(), nullable=False),
    sa.Column('responsible_name', sa.String(), nullable=True),
    sa.Column('responsible_phone', sa.String(), nullable=True),
    sa.Column('serie', sa.Enum('9º EF', '1º EM', '2º EM', '3º EM'), nullable=True),
    sa.Column('type', sa.Enum('admin', 'other', 'student'), nullable=False),
    sa.Column('soft_delete', sa.Boolean(), nullable=False),
    sa.Column('classroom_id', sa.Integer(), nullable=True),
    sa.Column('bank_account_id', sa.Integer(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['bank_account_id'], ['bank_accounts.id'], ),
    sa.ForeignKeyConstraint(['classroom_id'], ['classrooms.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_cpf'), 'users', ['cpf'], unique=True)
    op.create_table('achievements',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('type', sa.Enum('olympic medal', 'certificate'), nullable=False),
    sa.Column('olympic_acronym', sa.String(), nullable=False),
    sa.Column('year', sa.Integer(), nullable=False),
    sa.Column('medal', sa.Enum('participation', 'bronze', 'silver', 'gold'), nullable=False),
    sa.Column('link', sa.String(), nullable=True),
    sa.Column('other_info', sa.String(), nullable=True),
    sa.Column('status', sa.Enum('ready', 'pending', 'soft delete'), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('addresses',
    sa.Column('street', sa.String(), nullable=False),
    sa.Column('number', sa.Integer(), nullable=True),
    sa.Column('neighborhood', sa.String(), nullable=True),
    sa.Column('city', sa.String(), nullable=False),
    sa.Column('state', sa.String(), nullable=True),
    sa.Column('cep', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('school_id', sa.Integer(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['school_id'], ['schools.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('emails',
    sa.Column('value', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('school_id', sa.Integer(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['school_id'], ['schools.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('phone_numbers',
    sa.Column('value', sa.String(), nullable=False),
    sa.Column('isEmergency', sa.Boolean(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('school_id', sa.Integer(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['school_id'], ['schools.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('posts',
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('content', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('type', sa.Enum('Notice', 'ClassMaterial', 'Activity', 'Other'), nullable=False),
    sa.Column('endsOn', sa.Date(), nullable=True),
    sa.Column('maxGrade', sa.Float(), nullable=True),
    sa.Column('penalty_id', sa.Integer(), nullable=True),
    sa.Column('weight', sa.Float(), nullable=False),
    sa.Column('subject_id', sa.Integer(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['penalty_id'], ['penalties.id'], ),
    sa.ForeignKeyConstraint(['subject_id'], ['subjects.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('properties',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('type', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('loanedAt', sa.DateTime(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('teacher_subject',
    sa.Column('teacher_id', sa.Integer(), nullable=False),
    sa.Column('subject_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['subject_id'], ['subjects.id'], ),
    sa.ForeignKeyConstraint(['teacher_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('teacher_id', 'subject_id')
    )
    op.create_table('attatches',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('location', sa.String(), nullable=False),
    sa.Column('type', sa.Enum('File', 'Link'), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('achievement_id', sa.Integer(), nullable=True),
    sa.Column('property_id', sa.Integer(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['achievement_id'], ['achievements.id'], ),
    sa.ForeignKeyConstraint(['property_id'], ['properties.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('content', sa.String(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.Column('type', sa.Enum('Public', 'Private'), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('frequency',
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.Column('student_id', sa.Integer(), nullable=False),
    sa.Column('status', sa.Enum('Present', 'Missed', 'Justified'), nullable=False),
    sa.Column('justification', sa.String(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], ),
    sa.ForeignKeyConstraint(['student_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('expense_logs',
    sa.Column('value', sa.Float(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.Column('proof_id', sa.Integer(), nullable=True),
    sa.Column('type', sa.Enum('Deposit', 'Removal'), nullable=False),
    sa.Column('comment', sa.String(), nullable=True),
    sa.Column('paidTo_id', sa.Integer(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=True),
    sa.Column('updatedAt', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['category_id'], ['expense_categories.id'], ),
    sa.ForeignKeyConstraint(['paidTo_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['proof_id'], ['attatches.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('expense_logs')
    op.drop_table('frequency')
    op.drop_table('comments')
    op.drop_table('attatches')
    op.drop_table('teacher_subject')
    op.drop_table('properties')
    op.drop_table('posts')
    op.drop_table('phone_numbers')
    op.drop_table('emails')
    op.drop_table('addresses')
    op.drop_table('achievements')
    op.drop_index(op.f('ix_users_cpf'), table_name='users')
    op.drop_table('users')
    op.drop_table('subjects')
    op.drop_table('schools')
    op.drop_table('penalties')
    op.drop_table('expense_categories')
    op.drop_table('classrooms')
    op.drop_table('bank_accounts')
    # ### end Alembic commands ###
