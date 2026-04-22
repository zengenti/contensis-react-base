import { Entry, Node } from 'contensis-delivery-api';
export type RouteNode<T extends Entry = Entry> = Node<T> & {
    ancestors: Node[];
    children: Node[];
    siblings: Node[];
    entry: T;
};
