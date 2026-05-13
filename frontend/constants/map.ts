/**
 * When `false`, the map shows only Mapbox tiles/style (no app API calls).
 * When `true`, neighborhoods, buildings, streets, and city-feed GeoJSON are
 * fetched from `EXPO_PUBLIC_API_URL` (typically backed by PostgreSQL).
 */
export const LOAD_BACKEND_MAP_LAYERS = true;

/** Nazareth, Israel — Mapbox order is [longitude, latitude]. */
export const NAZARETH_CENTER: [number, number] = [35.3035, 32.6996];

export const DEFAULT_MAP_ZOOM = 13;

/**
 * Vector basemap. `streets-v12` is the most compatible default (2D, works on most emulators).
 * For Mapbox “Standard” (3D / global style), use: `mapbox://styles/mapbox/standard`
 */
export const MAP_STYLE_URL = 'mapbox://styles/mapbox/streets-v12';
