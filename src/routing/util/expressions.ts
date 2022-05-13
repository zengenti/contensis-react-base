import { IExpression } from 'contensis-core-api';
import { Op } from 'contensis-delivery-api';
import { Fields } from '~/util/schema';

export const fieldExpression = (
  field: string,
  value: string | string[],
  operator = 'equalTo',
  weight = null
) => {
  if (!field || !value) return [];
  if (Array.isArray(value)) return equalToOrIn(field, value, operator);
  else
    return !weight
      ? [Op[operator](field, value)]
      : [Op[operator](field, value).weight(weight)];
};

export const defaultExpressions = (
  versionStatus: 'published' | 'latest'
): IExpression[] => {
  return [Op.equalTo(Fields.sys.versionStatus, versionStatus)];
};

const equalToOrIn = (field: string, arr: string[], operator = 'equalTo') =>
  arr.length === 0
    ? []
    : arr.length === 1
    ? [Op[operator](field, arr[0])]
    : [Op.in(field, ...arr)];
