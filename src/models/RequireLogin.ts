type UserGroupRequisite = { id?: string; name?: string };

export type RequireLogin = boolean | UserGroupRequisite[];
