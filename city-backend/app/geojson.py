from __future__ import annotations

from datetime import datetime
from typing import Any


def feature_collection(features: list[dict[str, Any]]) -> dict[str, Any]:
    return {"type": "FeatureCollection", "features": features}


def _iso(dt: datetime | None) -> str | None:
    if dt is None:
        return None
    return dt.isoformat()


def feature_from_layers_row(
    row: Any,
    geometry: dict[str, Any] | None,
) -> dict[str, Any]:
    props: dict[str, Any] = dict(row.properties_json or {})
    props.update(
        {
            "id": row.id,
            "name": row.name,
            "created_at": _iso(row.created_at),
            "updated_at": _iso(row.updated_at),
        }
    )
    return {
        "type": "Feature",
        "geometry": geometry,
        "properties": props,
    }


def geometry_from_row(row: Any) -> dict[str, Any] | None:
    g = row.geometry_json
    if g is None:
        return None
    if isinstance(g, dict) and g.get("type") == "Feature" and "geometry" in g:
        return g["geometry"]
    return g


def city_feed_geometry(row: Any) -> dict[str, Any] | None:
    g = geometry_from_row(row)
    if g is not None:
        return g
    if row.longitude is not None and row.latitude is not None:
        return {
            "type": "Point",
            "coordinates": [float(row.longitude), float(row.latitude)],
        }
    return None


def feature_from_city_feed(row: Any) -> dict[str, Any]:
    geometry = city_feed_geometry(row)
    props: dict[str, Any] = {}
    props.update(
        {
            "id": row.id,
            "user_id": row.user_id,
            "type": row.type,
            "title": row.title,
            "description": row.description,
            "status": row.status,
            "latitude": row.latitude,
            "longitude": row.longitude,
            "photo_url": row.photo_url,
            "created_at": _iso(row.created_at),
            "updated_at": _iso(row.updated_at),
        }
    )
    return {
        "type": "Feature",
        "geometry": geometry,
        "properties": props,
    }
