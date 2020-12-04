//import React from 'react';
import Loadable from 'react-loadable';
import { Loading } from './Loading';

export default [
  {
    contentTypeID: 'zenbaseHomePage',
    component: Loadable({
      loader: () => {
        return import('~/pages/Home/Homepage');
      },
      loading: Loading,
    }),
    entryMapper: node => node.entry,
  },
];
