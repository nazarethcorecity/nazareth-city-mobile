import { palette } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';

/** Web stub — @rnmapbox/maps is used on iOS and Android dev builds. */
export function CityMapView() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.caption}>Map renders on device builds.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.border,
  },
  caption: {
    fontSize: 14,
    color: palette.textMuted,
    paddingHorizontal: 24,
    textAlign: 'center',
  },
});
