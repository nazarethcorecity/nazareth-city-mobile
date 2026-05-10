from flask import Blueprint, jsonify

from app.extensions import db
from app.geojson import (
    feature_collection,
    feature_from_city_feed,
    feature_from_layers_row,
    geometry_from_row,
)
from app.models import Building, CityFeed, Neighborhood, Street

geo_bp = Blueprint("geo", __name__)


@geo_bp.get("/neighborhoods")
def list_neighborhoods():
    rows = db.session.scalars(db.select(Neighborhood).order_by(Neighborhood.id)).all()
    features = [feature_from_layers_row(r, geometry_from_row(r)) for r in rows]
    return jsonify(feature_collection(features))


@geo_bp.get("/buildings")
def list_buildings():
    rows = db.session.scalars(db.select(Building).order_by(Building.id)).all()
    features = [feature_from_layers_row(r, geometry_from_row(r)) for r in rows]
    return jsonify(feature_collection(features))


@geo_bp.get("/streets")
def list_streets():
    rows = db.session.scalars(db.select(Street).order_by(Street.id)).all()
    features = [feature_from_layers_row(r, geometry_from_row(r)) for r in rows]
    return jsonify(feature_collection(features))


@geo_bp.get("/city-feed")
def list_city_feed():
    rows = db.session.scalars(db.select(CityFeed).order_by(CityFeed.id)).all()
    features = [feature_from_city_feed(r) for r in rows]
    return jsonify(feature_collection(features))
