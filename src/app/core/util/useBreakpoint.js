import { useContext, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
const mediaQueryBreakpoint = ({ size = 'min-width' }) => {
  if (!size) throw new Error('Must specify a breakpoint value');
  //return window.matchMedia(`only screen and (${type}: ${size})`);
  return true;
};
const useBreakpoint = (
  { size, type = 'min-width' },
  onChange = Function.prototype
) => {
  const { breakpoint: bp } = useContext(ThemeContext);
  size = bp[size] || size;
  const sizeBreakpoint = mediaQueryBreakpoint({ size, type });
  //Using hook to determine breakpoint matches
  //matches if screen width is >= the given size
  //TODO: make only on mount/unmount (e.g. (fn, []))
  //so it doesn't constant set and unset the breakpoint listener
  useEffect(() => {
    const handleBreakpointChange = evt => {
      //set on change
      onChange(evt.matches);
    };

    sizeBreakpoint.addListener(handleBreakpointChange);
    return () => {
      return sizeBreakpoint.removeListener(handleBreakpointChange);
    };
  });
  return sizeBreakpoint.matches;
};
export default useBreakpoint;
