/**
 * Set `EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN` in a `.env` file (Expo loads it automatically).
 * Create a public token at https://account.mapbox.com/access-tokens/
 */
export const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '';
