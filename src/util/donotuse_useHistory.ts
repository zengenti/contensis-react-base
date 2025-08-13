import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

/** @deprecated ponyfill for useHistory hook in react-router v5 removed in v6 */
export const useHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    push: navigate,
    replace: navigate,
    location,
  };
};
