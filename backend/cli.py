import click
from app.models import base
from app.services.db import create_default_user, create_test_student, engine


@click.group()
def cli():
    pass


@cli.command("init-db")
def init_db():
    print("Initializing DB")
    base.BaseTable.metadata.create_all(bind=engine)
    create_default_user()
    create_test_student()


if __name__ == "__main__":
    cli()
