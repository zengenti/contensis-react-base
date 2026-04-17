import { Entry } from 'contensis-delivery-api';
import { AppState } from './AppState';
import { RouteNode } from './RouteNode';
export type EntryMapper<MappedProps = any, RouteEntryType extends Entry = Entry> = (node: RouteNode<RouteEntryType>, state: AppState) => MappedProps | Promise<MappedProps>;
