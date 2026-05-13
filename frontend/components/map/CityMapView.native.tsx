import { DEFAULT_MAP_ZOOM, MAP_STYLE_URL, NAZARETH_CENTER } from '@/constants/map';
import { palette, radii, shadows } from '@/constants/theme';
import {
  defaultLayerVisibility,
  type CityMapLayerId,
  useCityMapLayers,
} from '@/services/mapLayers';
import {
  Camera,
  CircleLayer,
  FillLayer,
  LineLayer,
  MapView,
  ShapeSource,
} from '@rnmapbox/maps';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

const LAYER_LABELS: Record<CityMapLayerId, string> = {
  neighborhoods: 'Neighborhoods',
  buildings: 'Buildings',
  streets: 'Streets',
  reports: 'Reports',
};

export function CityMapView() {
  const { data, loading, error, reload, configured } = useCityMapLayers();
  const [visibility, setVisibility] = useState<Record<CityMapLayerId, boolean>>(defaultLayerVisibility);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    console.log('[Map] screen mounted');
  }, []);

  const panelRows = useMemo(
    () =>
      (Object.keys(LAYER_LABELS) as CityMapLayerId[]).map((id) => ({
        id,
        label: LAYER_LABELS[id],
        value: visibility[id],
      })),
    [visibility],
  );

  return (
    <View style={styles.wrap}>
      <MapView
        style={styles.map}
        styleURL={MAP_STYLE_URL}
        scaleBarEnabled={false}
        onDidFinishLoadingStyle={() => {
          setMapReady(true);
          setMapError(null);
        }}
        onDidFailLoadingMap={(event) => {
          const message = event.nativeEvent?.message ?? 'Map failed to load';
          setMapError(message);
        }}
      >
        <Camera centerCoordinate={NAZARETH_CENTER} zoomLevel={DEFAULT_MAP_ZOOM} animationMode="none" />
        {data ? (
          <>
            <ShapeSource id="neighborhoods" shape={data.neighborhoods}>
              <FillLayer
                id="neighborhoods-fill"
                style={{
                  fillColor: palette.primary,
                  fillOpacity: 0.22,
                  fillOutlineColor: palette.primaryDark,
                  visibility: visibility.neighborhoods ? 'visible' : 'none',
                }}
              />
            </ShapeSource>
            <ShapeSource id="buildings" shape={data.buildings}>
              <FillLayer
                id="buildings-fill"
                style={{
                  fillColor: '#64748B',
                  fillOpacity: 0.35,
                  fillOutlineColor: '#475569',
                  visibility: visibility.buildings ? 'visible' : 'none',
                }}
              />
            </ShapeSource>
            <ShapeSource id="streets" shape={data.streets}>
              <LineLayer
                id="streets-line"
                style={{
                  lineColor: '#334155',
                  lineWidth: 2,
                  visibility: visibility.streets ? 'visible' : 'none',
                }}
              />
            </ShapeSource>
            <ShapeSource id="city-feed" shape={data.cityFeed}>
              <CircleLayer
                id="city-feed-circles"
                style={{
                  circleRadius: 6,
                  circleColor: '#DC2626',
                  circleStrokeWidth: 2,
                  circleStrokeColor: '#FFFFFF',
                  visibility: visibility.reports ? 'visible' : 'none',
                }}
              />
            </ShapeSource>
          </>
        ) : null}
      </MapView>

      {data ? (
        <View style={[styles.layerPanel, shadows.card]} pointerEvents="box-none">
          <Text style={styles.panelTitle}>Layers</Text>
          <ScrollView style={styles.panelScroll} showsVerticalScrollIndicator={false}>
            {panelRows.map((row) => (
              <View key={row.id} style={styles.panelRow}>
                <Text style={styles.panelLabel}>{row.label}</Text>
                <Switch
                  value={row.value}
                  onValueChange={(v) => setVisibility((prev) => ({ ...prev, [row.id]: v }))}
                  trackColor={{ false: palette.border, true: palette.primary }}
                  thumbColor={palette.surface}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      ) : null}

      {!mapReady && !mapError ? (
        <View style={styles.stateOverlay} pointerEvents="none">
          <ActivityIndicator size="large" color={palette.primary} />
          <Text style={styles.stateTitle}>Loading map…</Text>
        </View>
      ) : null}

      {loading ? (
        <View style={styles.stateOverlay} pointerEvents="auto">
          <ActivityIndicator size="large" color={palette.primary} />
          <Text style={styles.stateTitle}>Loading map data…</Text>
        </View>
      ) : null}

      {!loading && (error || mapError) ? (
        <View style={styles.stateOverlay} pointerEvents="auto">
          <Text style={styles.stateTitle}>{mapError ? 'Map failed to load' : configured ? 'Could not load layers' : 'API URL missing'}</Text>
          <Text style={styles.stateBody}>{mapError ?? error}</Text>
          <Pressable style={styles.retryBtn} onPress={() => void reload()}>
            <Text style={styles.retryLabel}>Retry</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  layerPanel: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 220,
    maxHeight: 260,
    borderRadius: radii.md,
    backgroundColor: palette.surface,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  panelTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 8,
  },
  panelScroll: {
    maxHeight: 220,
  },
  panelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    gap: 8,
  },
  panelLabel: {
    flex: 1,
    fontSize: 14,
    color: palette.text,
  },
  stateOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(244, 246, 249, 0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  stateTitle: {
    marginTop: 12,
    fontSize: 17,
    fontWeight: '700',
    color: palette.text,
    textAlign: 'center',
  },
  stateBody: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: palette.textMuted,
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: radii.md,
    backgroundColor: palette.primary,
  },
  retryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: palette.surface,
  },
});
