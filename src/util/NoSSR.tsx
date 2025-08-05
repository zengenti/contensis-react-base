import React from 'react';
import { useIsClient } from './useIsClient';

/**
 * NoSSR component to prevent children from rendering on the server.
 * Renders children only after component has mounted in the browser.
 */
export const NoSSR: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isClient = useIsClient();

  if (!isClient) return null;

  return <>{children}</>;
};
