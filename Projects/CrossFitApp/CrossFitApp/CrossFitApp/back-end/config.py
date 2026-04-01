import os

database_url = os.getenv("DATABASE_URL", "").strip()

if database_url:
    # Prefer full DSN for hosted deployments to avoid split-env drift.
    config = {
        "dsn": database_url,
        "sslmode": os.getenv("DB_SSLMODE", "require"),
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
