import { Group } from 'contensis-management-api/lib/models';
import { RequireLogin } from '~/models';

export const matchUserGroup = (
  userGroups: Group[] = [],
  requiredGroups: RequireLogin = []
) => {
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
