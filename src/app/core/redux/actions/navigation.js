import { action } from '~/core/util/helpers';

import { GET_NODE_TREE } from '~/core/redux/types/navigation';

export const loadNavigationTree = () => action(GET_NODE_TREE);
