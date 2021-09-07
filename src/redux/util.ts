export const action = (type: string, payload: any = {}) => ({
  type,
  ...payload,
});
