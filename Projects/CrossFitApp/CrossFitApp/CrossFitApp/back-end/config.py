import os
from urllib.parse import urlparse

database_url = os.getenv("CROSSFIT_DATABASE_URL", "").strip()
database_url_source = "CROSSFIT_DATABASE_URL"

if not database_url:
    database_url = os.getenv("DATABASE_URL", "").strip()
    database_url_source = "DATABASE_URL"

config_meta = {}

if database_url:
    parsed = urlparse(database_url)
    if parsed.password is None or parsed.password == "":
        raise ValueError(
            "DATABASE_URL is set but does not include a password. "
            "Use: postgresql://user:password@host:port/dbname"
        )
    if "[YOUR-PASSWORD]" in database_url or "YOUR_PASSWORD" in database_url:
        raise ValueError(
            "DATABASE_URL still contains a placeholder password. "
            "Replace it with your real database password."
        )

    # Prefer full DSN for hosted deployments to avoid split-env drift.
    config = {
        "dsn": database_url,
        "sslmode": os.getenv("DB_SSLMODE", "require"),
    }
    config_meta = {
        "source": database_url_source,
        "has_dsn_password": bool(parsed.password),
    }
else:
    config = {
        "user": os.getenv("DB_USER", "postgres"),
        "password": os.getenv("DB_PASSWORD", "").strip(),
        "dbname": os.getenv("DB_NAME", "postgres"),
        "host": os.getenv("DB_HOST", "127.0.0.1"),
        "port": int(os.getenv("DB_PORT", 5432)),
        "sslmode": os.getenv("DB_SSLMODE", "require"),
    }
    config_meta = {
        "source": "DB_SPLIT_VARS",
        "has_db_password": bool(config["password"]),
    }
