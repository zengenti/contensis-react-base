import { Node } from 'contensis-delivery-api';
export type RouteNode = Node & {
    ancestors: Node[];
    children: Node[];
};
