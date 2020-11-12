export const matchUserGroup = (userGroups = [], requiredGroups = []) => {
  if (
    !Array.isArray(requiredGroups) ||
    (Array.isArray(requiredGroups) && requiredGroups.length === 0)
  )
    return true;

  const groupMatch = requiredGroups.some(requiredGroup => {
    return userGroups.some(userGroup => {
      if (requiredGroup.id === userGroup.id) {
        return true;
      }
      if (requiredGroup.name === userGroup.name) {
        return true;
      }
    });
  });
  return groupMatch;
};
