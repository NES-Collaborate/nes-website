class Settings:

    DATABASE_URL: str = "sqlite:///./db.sqlite"
    SECRET_KEY: str = "something here (recommend: openssl rand -hex 32)"
    ALGORITHM: str = "HS256"
    UPLOADS_PATH: str = "uploads"
    DEFAULT_PASS: str = "default"
    ORIGINS: list[str] = [ 
        "http://localhost:3000",
        "http://localhost",
    ]


def get_settings():
    return Settings()


settings = get_settings()
