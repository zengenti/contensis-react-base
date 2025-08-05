// hooks/useIsClient.ts
import { useEffect, useState } from 'react';
/**
 * A hook that returns true only when the component has mounted in the browser client
 * Used to prevent SSR render and defer rendering to client-side to safely refernce
 * browser-only apis or avoid React Hydration errors
 */
export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient;
};
