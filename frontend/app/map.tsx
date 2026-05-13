import { MapScreen } from '@/components/map/MapScreen';
import { useAuth } from '@/store/AuthContext';
import { Redirect } from 'expo-router';

export default function MapRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/" />;
  }

  return <MapScreen />;
}
