import React from 'react';
/**
 * NoSSR component to prevent children from rendering on the server.
 * Renders children only after component has mounted in the browser.
 */
export declare const NoSSR: React.FC<React.PropsWithChildren>;
