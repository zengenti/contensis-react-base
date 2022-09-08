import { IExpression } from 'contensis-core-api';
export declare const fieldExpression: (field: string, value: string | string[], operator?: string, weight?: null) => any[];
export declare const defaultExpressions: (versionStatus: 'published' | 'latest') => IExpression[];
