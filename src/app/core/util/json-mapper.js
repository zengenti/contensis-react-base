import mapJson from 'jsonpath-mapper';

export const useMapper = (json, template) => {
  return mapJson(json, template);
};

export default mapJson;
