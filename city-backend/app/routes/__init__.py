from flask import Flask

from app.routes.geo import geo_bp
from app.routes.health import health_bp


def register_blueprints(app: Flask) -> None:
    app.register_blueprint(health_bp, url_prefix="/api")
    app.register_blueprint(geo_bp, url_prefix="/api")
