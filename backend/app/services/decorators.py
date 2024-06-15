from functools import wraps
from typing import Any, Callable, TypeVar

F = TypeVar("F", bound=Callable[..., Any])


def paginated_response(function: F) -> F:
    @wraps(function)
    async def wrapper(*args: Any, **kwargs: Any) -> Any:
        response = await function(*args, **kwargs)

        p = int(kwargs.get("p", 0))
        pp = int(kwargs.get("pp", 0))
        total = len(response)

        last_page = (total // pp) + (1 if total % pp != 0 else 0)
        next_page = p + 1 if p * pp < total else None
        prev_page = p - 1 if p > 1 else None

        return {
            "data": response,
            "total": total,
            "page": p,
            "nextPage": next_page,
            "prevPage": prev_page,
            "lastPage": last_page,
        }

    return wrapper  # type: ignore
