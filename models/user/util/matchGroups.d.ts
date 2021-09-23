import { Group } from 'contensis-management-api/lib/models';
import { RequireLogin } from '~/routing/routes';
export declare const matchUserGroup: (userGroups?: Group[], requiredGroups?: RequireLogin) => boolean;
