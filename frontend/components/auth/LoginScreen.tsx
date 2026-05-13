import { APP_NAME, APP_TAGLINE } from '@/constants/app';
import { palette, radii, shadows } from '@/constants/theme';
import { useAuth } from '@/store/AuthContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    try {
      await signIn();
      router.replace('/map');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 16 }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.hero}>
        <View style={styles.logoMark}>
          <Text style={styles.logoLetter}>N</Text>
        </View>
        <Text style={styles.title}>{APP_NAME}</Text>
        <Text style={styles.tagline}>{APP_TAGLINE}</Text>
      </View>

      <View style={[styles.card, shadows.card]}>
        <Text style={styles.cardTitle}>Sign in</Text>
        <Text style={styles.cardHint}>Demo only — no account is verified yet.</Text>

        <TextInput
          placeholder="Email (optional)"
          placeholderTextColor={palette.textMuted}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!loading}
        />
        <TextInput
          placeholder="Password (optional)"
          placeholderTextColor={palette.textMuted}
          style={styles.input}
          secureTextEntry
          editable={!loading}
        />

        <Pressable
          style={({ pressed }) => [styles.primaryBtn, pressed && styles.primaryBtnPressed, loading && styles.btnDisabled]}
          onPress={onLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryBtnLabel}>Login</Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.background,
    paddingHorizontal: 22,
    justifyContent: 'center',
  },
  hero: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoMark: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoLetter: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: palette.text,
  },
  tagline: {
    marginTop: 6,
    fontSize: 15,
    color: palette.textMuted,
  },
  card: {
    backgroundColor: palette.surface,
    borderRadius: radii.lg,
    padding: 22,
    borderWidth: 1,
    borderColor: palette.border,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.text,
  },
  cardHint: {
    marginTop: 6,
    marginBottom: 18,
    fontSize: 14,
    color: palette.textMuted,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: radii.md,
    paddingHorizontal: 14,
    paddingVertical: Platform.select({ ios: 14, default: 12 }),
    fontSize: 16,
    color: palette.text,
    marginBottom: 12,
    backgroundColor: '#FAFBFC',
  },
  primaryBtn: {
    marginTop: 8,
    backgroundColor: palette.primary,
    borderRadius: radii.md,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnPressed: {
    backgroundColor: palette.primaryDark,
  },
  btnDisabled: {
    opacity: 0.7,
  },
  primaryBtnLabel: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});
