import os

from flask import Flask

from app.config import config_by_name
from app.extensions import cors, db, migrate
from app.routes import register_blueprints


def create_app(config_name: str | None = None) -> Flask:
    app = Flask(__name__)
    config_name = config_name or os.getenv("FLASK_CONFIG", "default")
    app.config.from_object(config_by_name[config_name])

    cors.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)

    from app import models  # noqa: F401 — register metadata for Alembic

    register_blueprints(app)

    return app
