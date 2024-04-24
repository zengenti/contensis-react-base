import { FieldLinkDepths } from 'contensis-core-api';
import { Entry } from 'contensis-delivery-api';
import { GetRouteActionArgs } from './GetRouteActionArgs';
import { RequireLogin } from './RequireLogin';

// These args are passed through from the GetRouteSaga action arg
export type OnRouteLoadArgs = Omit<GetRouteActionArgs, 'withEvents'>;

// These args are as above and any resolved entry is also provided
export type OnRouteLoadedArgs = OnRouteLoadArgs & {
  entry?: Entry | any;
};

export type RouteLoadOptions = {
  customNavigation?:
    | boolean
    | {
        ancestors: boolean | number;
        children: boolean | number;
        siblings: boolean | number;
        tree: boolean | number;
      };
  customRouting?: boolean;
  defaultLang?: string;
  entryLinkDepth?: number;
  entryFieldLinkDepths?: FieldLinkDepths;
  preventScrollTop?: boolean;
  refetchNode?: true;
};

export type RouteLoadedOptions = { requireLogin?: RequireLogin };

export type WithEvents = {
  onRouteLoad: (args: OnRouteLoadArgs) => Generator<void | RouteLoadOptions>;
  onRouteLoaded: (
    args: OnRouteLoadedArgs
  ) => Generator<void | RouteLoadedOptions>;
};
