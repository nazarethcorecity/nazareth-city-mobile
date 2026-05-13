import { palette, radii, shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

type Props = {
  bottomInset: number;
  onPress?: () => void;
};

export function FloatingActionPlaceholder({ bottomInset, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Quick action placeholder"
      onPress={onPress}
      style={({ pressed }) => [
        styles.fab,
        shadows.fab,
        { bottom: bottomInset + 20 },
        pressed && styles.fabPressed,
      ]}
    >
      <Ionicons name="add" size={32} color="#FFFFFF" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    width: 58,
    height: 58,
    borderRadius: radii.full,
    backgroundColor: palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabPressed: {
    backgroundColor: palette.primaryDark,
  },
});
