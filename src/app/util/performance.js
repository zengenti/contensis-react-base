export const now = () => {
  if (typeof window == 'undefined') {
    return Date.now();
  }
  return window.performance.now();
};
