run-dev:
	@uvicorn app:app --reload --host 0.0.0.0 --port 8000

run:
	@uvicorn main:app --host 0.0.0.0 --port 8000

migrate:
	@alembic revision --autogenerate -m "$(msg)"

upgrade:
	@alembic upgrade head

downgrade:
	@alembic downgrade -1