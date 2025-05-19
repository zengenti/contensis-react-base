import mapJson from 'jsonpath-mapper';
import { QueryParams } from '../models';

const mapQueryParamsToCustomApi = (queryParams: QueryParams) => {
  const customApiMapping = {
    fieldLinkDepths: ({ fieldLinkDepths }: QueryParams) => JSON.stringify(fieldLinkDepths),
    fields: ({ fields }: QueryParams) => JSON.stringify(fields),
    orderBy: 'orderBy',
    linkDepth: 'linkDepth',
    pageSize: 'pageSize',
    pageIndex: 'pageIndex',
    term: { $path: 'searchTerm', $disable: (t: string) => !t },
    versionStatus: 'versionStatus',
  };

  Object.keys(queryParams.selectedFilters).forEach(k => {
    customApiMapping[k] = {
      $path: `selectedFilters.${k}`,
      $disable: (f: string) => !f,
    };
  });

  return mapJson(queryParams, customApiMapping);
};
export default mapQueryParamsToCustomApi;
