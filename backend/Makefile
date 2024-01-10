run-dev:
	@uvicorn main:app --reload --host 0.0.0.0 --port 8000

run:
	@uvicorn main:app --host 0.0.0.0 --port 8000

format:
	@echo "Sorting imports with isort..."
	@isort . --profile black --diff
	@echo "Formatting with YAPF..."
	@yapf . -i -r -p -m