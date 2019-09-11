export const selectUserDetails = state => {
  return state.getIn(['user', 'userDetails']);
};
export const selectUserDetailsAreHidden = state => {
  return state.getIn(['user', 'userDetailsAreHidden']);
};
