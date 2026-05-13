import { AppHeader } from '@/components/layout/AppHeader';
import { FloatingActionPlaceholder } from '@/components/layout/FloatingActionPlaceholder';
import { CityMapView } from '@/components/map/CityMapView';
import { MAPBOX_ACCESS_TOKEN } from '@/constants/secrets';
import { palette } from '@/constants/theme';
import { useAuth } from '@/store/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function MapScreen() {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();

  if (!MAPBOX_ACCESS_TOKEN && Platform.OS !== 'web') {
    return (
      <View style={[styles.tokenMissing, { paddingTop: insets.top + 24 }]}>
        <Ionicons name="key-outline" size={40} color={palette.primary} />
        <Text style={styles.tokenTitle}>Mapbox token needed</Text>
        <Text style={styles.tokenBody}>
          Add <Text style={styles.mono}>EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN</Text> to your environment, then
          rebuild the native app (<Text style={styles.mono}>npx expo prebuild</Text> / EAS).
        </Text>
        <Pressable style={styles.secondaryBtn} onPress={signOut}>
          <Text style={styles.secondaryBtnLabel}>Back to sign in</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={[styles.headerSafe, { paddingTop: insets.top }]}>
        <AppHeader onProfilePress={() => {}} />
      </View>
      <View style={styles.mapArea}>
        <CityMapView />
        <FloatingActionPlaceholder bottomInset={insets.bottom} onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.surface,
  },
  headerSafe: {
    backgroundColor: palette.surface,
  },
  mapArea: {
    flex: 1,
    position: 'relative',
  },
  mono: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
    fontSize: 14,
    color: palette.text,
  },
  tokenMissing: {
    flex: 1,
    paddingHorizontal: 28,
    backgroundColor: palette.background,
    alignItems: 'center',
  },
  tokenTitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '700',
    color: palette.text,
    textAlign: 'center',
  },
  tokenBody: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: palette.textMuted,
    textAlign: 'center',
  },
  secondaryBtn: {
    marginTop: 28,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.surface,
  },
  secondaryBtnLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: palette.primaryDark,
  },
});
