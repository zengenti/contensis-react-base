import { Entry } from 'contensis-delivery-api';
export type RouteComponentProps<P = any> = {
    [key: string]: any;
    projectId?: string;
    contentTypeId?: string;
    entry?: Entry | null;
    mappedEntry?: P;
    isLoggedIn?: boolean;
};
