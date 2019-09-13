import { useEffect } from 'react';
import isNonEmptyArray from '~/core/util/isNonEmptyArray';
function isOutside(ref, event) {
  return ref.current && !ref.current.contains(event.target);
}
function useOnClickOutside(ref, onClick) {
  function handleClickOutside(event) {
    if (!isNonEmptyArray(ref)) {
      ref = [ref];
    }
    if (
      ref.reduce((bOutside, ref) => bOutside && isOutside(ref, event), true)
    ) {
      onClick();
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}
export default useOnClickOutside;
