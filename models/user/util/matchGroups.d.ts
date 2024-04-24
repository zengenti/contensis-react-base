import { Group } from 'contensis-management-api/lib/models';
import { RequireLogin } from "../../models";
export declare const matchUserGroup: (userGroups?: Group[], requiredGroups?: RequireLogin) => boolean;
