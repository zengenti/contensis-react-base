/// <reference types="react" />
import { LoadableComponent } from '@loadable/component';
import { RouteComponentProps } from './RouteComponentProps';
export type RouteComponent<Props> = LoadableComponent<RouteComponentProps> | React.ComponentType<Props>;
