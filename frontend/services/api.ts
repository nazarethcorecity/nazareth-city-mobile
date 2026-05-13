import type { FeatureCollection } from 'geojson';

function normalizeBaseUrl(raw: string | undefined): string {
  const t = raw?.trim();
  if (!t) {
    return '';
  }
  return t.replace(/\/+$/, '');
}

export function getApiBaseUrl(): string {
  const base = normalizeBaseUrl(process.env.EXPO_PUBLIC_API_URL);
  console.log(`[API] base URL: ${base || '(missing)'}`);
  return base;
}

export function requireApiBaseUrl(): string {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error('EXPO_PUBLIC_API_URL is not set');
  }
  return base;
}

async function fetchFeatureCollection(path: string, label: string): Promise<FeatureCollection> {
  const base = requireApiBaseUrl();
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;
  console.log(`[API] GET ${url}`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${label} failed (${res.status})`);
  }
  const data: unknown = await res.json();
  if (
    typeof data !== 'object' ||
    data === null ||
    (data as FeatureCollection).type !== 'FeatureCollection' ||
    !Array.isArray((data as FeatureCollection).features)
  ) {
    throw new Error(`${label} returned invalid GeoJSON`);
  }
  return data as FeatureCollection;
}

export function fetchNeighborhoods(): Promise<FeatureCollection> {
  return fetchFeatureCollection('/api/neighborhoods', 'Neighborhoods');
}

export function fetchBuildings(): Promise<FeatureCollection> {
  return fetchFeatureCollection('/api/buildings', 'Buildings');
}

export function fetchStreets(): Promise<FeatureCollection> {
  return fetchFeatureCollection('/api/streets', 'Streets');
}

export function fetchCityFeed(): Promise<FeatureCollection> {
  return fetchFeatureCollection('/api/city-feed', 'City feed');
}
