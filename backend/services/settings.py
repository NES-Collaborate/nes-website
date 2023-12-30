class Settings:

    DATABASE_URL: str = "sqlite:///./db.sqlite"
    SECRET_KEY: str = "something here (recommend: openssl rand -hex 32)"
    ALGORITHM: str = "HS256"
    COOKIE_PATH: str = "http://localhost:8000"
    DEFAULT_PASS: str = "default"
    ORIGINS: list[str] = [
        "http://localhost:3000",
    ]


def get_settings():
    return Settings()


settings = get_settings()
