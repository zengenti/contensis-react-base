import { action } from '../util';

import { GET_NODE_TREE } from '~/redux/types/navigation';

export const loadNavigationTree = () => action(GET_NODE_TREE);
