import type { SessionUser } from '@/types/session';

const DEMO_USER: SessionUser = {
  id: 'demo-user',
  displayName: 'Demo resident',
};

/**
 * Simulates sign-in without a backend. Replace with a real API call later.
 */
export async function signInWithFakeCredentials(): Promise<SessionUser> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return DEMO_USER;
}
