import { APP_NAME } from '@/constants/app';
import { palette, radii } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  onProfilePress?: () => void;
};

export function AppHeader({ onProfilePress }: Props) {
  return (
    <View style={styles.bar}>
      <View style={styles.side} />
      <Text style={styles.title} numberOfLines={1}>
        {APP_NAME}
      </Text>
      <View style={styles.side}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Profile placeholder"
          onPress={onProfilePress}
          style={({ pressed }) => [styles.profileBtn, pressed && styles.profileBtnPressed]}
        >
          <Ionicons name="person-circle-outline" size={28} color={palette.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: palette.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.border,
  },
  side: {
    width: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
    color: palette.text,
  },
  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.overlay,
  },
  profileBtnPressed: {
    opacity: 0.72,
  },
});
