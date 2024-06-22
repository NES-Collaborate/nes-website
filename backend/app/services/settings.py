from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_USER: str = "admin"
    DATABASE_PASSWORD: str = "admin"
    DATABASE_NAME: str = "nes"
    DATABASE_HOST: str = "nes-postgres"
    DATABASE_PORT: int = 5432
    SECRET_KEY: str = "must be generated with openssl rand -hex 32"
    DOMAIN_LIST: str = "http://localhost:3000,http://localhost"
    ALGORITHM: str = "HS256"

    @property
    def DATABASE_URL(self) -> str:
        return (
            f"postgresql+psycopg2://{self.DATABASE_USER}:{self.DATABASE_PASSWORD}"
            f"@{self.DATABASE_HOST}:{self.DATABASE_PORT}/{self.DATABASE_NAME}"
        )

    @property
    def ORIGINS(self) -> list[str]:
        return self.DOMAIN_LIST.split(",")


settings = Settings()
