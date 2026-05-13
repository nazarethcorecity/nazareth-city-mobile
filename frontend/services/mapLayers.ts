import { LOAD_BACKEND_MAP_LAYERS } from '@/constants/map';
import type { Feature, FeatureCollection } from 'geojson';
import { useCallback, useEffect, useState } from 'react';

import { fetchBuildings, fetchCityFeed, fetchNeighborhoods, fetchStreets, getApiBaseUrl } from '@/services/api';

export const emptyFeatureCollection = (): FeatureCollection => ({
  type: 'FeatureCollection',
  features: [],
});

function hasRenderableGeometry(f: Feature): boolean {
  const g = f.geometry;
  if (g === null || g === undefined) {
    return false;
  }
  return true;
}

/** Drops features with null/missing geometry so ShapeSource never receives invalid entries. */
export function sanitizeFeatureCollection(fc: FeatureCollection): FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: fc.features.filter(hasRenderableGeometry),
  };
}

function isPointGeometry(g: Feature['geometry']): boolean {
  if (!g) {
    return false;
  }
  return g.type === 'Point' || g.type === 'MultiPoint';
}

/** City feed markers: only point geometries work with CircleLayer. */
export function pointsOnlyFeatureCollection(fc: FeatureCollection): FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: fc.features.filter((f) => hasRenderableGeometry(f) && isPointGeometry(f.geometry)),
  };
}

export type CityMapLayerId = 'neighborhoods' | 'buildings' | 'streets' | 'reports';

export type CityMapLayerData = {
  neighborhoods: FeatureCollection;
  buildings: FeatureCollection;
  streets: FeatureCollection;
  cityFeed: FeatureCollection;
};

export const defaultLayerVisibility: Record<CityMapLayerId, boolean> = {
  neighborhoods: true,
  buildings: true,
  streets: true,
  reports: true,
};

export async function loadCityMapLayers(): Promise<CityMapLayerData> {
  const [neighborhoods, buildings, streets, cityFeed] = await Promise.all([
    fetchNeighborhoods(),
    fetchBuildings(),
    fetchStreets(),
    fetchCityFeed(),
  ]);

  return {
    neighborhoods: sanitizeFeatureCollection(neighborhoods),
    buildings: sanitizeFeatureCollection(buildings),
    streets: sanitizeFeatureCollection(streets),
    cityFeed: pointsOnlyFeatureCollection(sanitizeFeatureCollection(cityFeed)),
  };
}

export type UseCityMapLayersResult = {
  data: CityMapLayerData | null;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  configured: boolean;
};

export function useCityMapLayers(): UseCityMapLayersResult {
  const [data, setData] = useState<CityMapLayerData | null>(null);
  const [loading, setLoading] = useState(LOAD_BACKEND_MAP_LAYERS);
  const [error, setError] = useState<string | null>(null);

  const configured = Boolean(getApiBaseUrl());

  const reload = useCallback(async () => {
    if (!LOAD_BACKEND_MAP_LAYERS) {
      setLoading(false);
      setError(null);
      setData(null);
      return;
    }

    if (!getApiBaseUrl()) {
      setLoading(false);
      setError('EXPO_PUBLIC_API_URL is not set');
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const layers = await loadCityMapLayers();
      setData(layers);
    } catch (e) {
      setData(null);
      setError(e instanceof Error ? e.message : 'Could not load map layers');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { data, loading, error, reload, configured };
}
