export const palette = {
  background: '#F4F6F9',
  surface: '#FFFFFF',
  primary: '#0D9488',
  primaryDark: '#0F766E',
  text: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  overlay: 'rgba(15, 23, 42, 0.06)',
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

export const shadows = {
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  fab: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
  },
} as const;
