import Mapbox from '@rnmapbox/maps';

import { MAPBOX_ACCESS_TOKEN } from '@/constants/secrets';

if (MAPBOX_ACCESS_TOKEN) {
  Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);
}

console.log(`[Mapbox] token exists: ${MAPBOX_ACCESS_TOKEN ? 'yes' : 'no'}`);
