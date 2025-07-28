import { AppState } from './AppState';
import { RouteNode } from './RouteNode';
export type EntryMapper = (<MappedProps>(node: RouteNode, state?: AppState) => MappedProps | unknown) | (<MappedProps>(node: RouteNode, state?: AppState) => Promise<MappedProps | unknown>);
