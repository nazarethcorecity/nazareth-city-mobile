from datetime import datetime, timezone

from app.extensions import db


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    created_at = db.Column(db.DateTime(timezone=True), default=_utc_now, nullable=False)
    updated_at = db.Column(
        db.DateTime(timezone=True),
        default=_utc_now,
        onupdate=_utc_now,
        nullable=False,
    )


class Neighborhood(db.Model):
    __tablename__ = "neighborhoods"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(512), nullable=False)
    geometry_json = db.Column(db.JSON, nullable=True)
    properties_json = db.Column(db.JSON, nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), default=_utc_now, nullable=False)
    updated_at = db.Column(
        db.DateTime(timezone=True),
        default=_utc_now,
        onupdate=_utc_now,
        nullable=False,
    )


class Building(db.Model):
    __tablename__ = "buildings"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(512), nullable=False)
    geometry_json = db.Column(db.JSON, nullable=True)
    properties_json = db.Column(db.JSON, nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), default=_utc_now, nullable=False)
    updated_at = db.Column(
        db.DateTime(timezone=True),
        default=_utc_now,
        onupdate=_utc_now,
        nullable=False,
    )


class Street(db.Model):
    __tablename__ = "streets"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(512), nullable=False)
    geometry_json = db.Column(db.JSON, nullable=True)
    properties_json = db.Column(db.JSON, nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), default=_utc_now, nullable=False)
    updated_at = db.Column(
        db.DateTime(timezone=True),
        default=_utc_now,
        onupdate=_utc_now,
        nullable=False,
    )


class CityFeed(db.Model):
    __tablename__ = "city_feeds"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, index=True)
    type = db.Column(db.String(128), nullable=False)
    title = db.Column(db.String(512), nullable=False)
    description = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(64), nullable=False)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    geometry_json = db.Column(db.JSON, nullable=True)
    photo_url = db.Column(db.String(2048), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), default=_utc_now, nullable=False)
    updated_at = db.Column(
        db.DateTime(timezone=True),
        default=_utc_now,
        onupdate=_utc_now,
        nullable=False,
    )
