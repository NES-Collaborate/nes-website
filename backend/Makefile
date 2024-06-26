run-dev:
	@uvicorn app:app --reload --host 0.0.0.0 --port 8000

run:
	@uvicorn app:app --host 0.0.0.0 --port 8000

format:
	@echo "Sorting imports with isort..."
	@isort . --profile black --diff
	@echo "Formatting with YRUFF..."
	@ruff check --select I --fix
	@ruff format .


migrate:
	@alembic revision --autogenerate -m "$(msg)"

upgrade:
	@alembic upgrade head

downgrade:
	@alembic downgrade -1

init-db:
	@python cli.py init-db
	@alembic upgrade head

test-cov: #Executa os testes iguinorando os warnings e gera o relatório de corbetura.
	@echo "Running tests with coverage..."
	PYTHONWARNINGS="ignore::DeprecationWarning,ignore::PendingDeprecationWarning,ignore::FutureWarning,ignore::RuntimeWarning,ignore::UserWarning" pytest --cov=./app/routers --cov-report=html:cov_html -vv ./tests
	@echo "Open the HTML report at: cov_html/index.html"