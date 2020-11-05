//import React from 'react';
import Loadable from 'react-loadable';
import { Loading } from './Loading';

export default [
  // {
  //   contentTypeID: 'zenbaseHomePage',
  //   component: Loadable({
  //     loader: () => {
  //       return import('~/pages/Home/Homepage');
  //     },
  //     loading: Loading,
  //   }),
  //   entryMapper: node => node.entry,
  // },
  {
    contentTypeID: 'articleImageApi',
    component: Loadable({
      loader: () => {
        return import('~/pages/Article');
      },
      loading: Loading,
    }),
    entryMapper: ({ entry }) => (entry ? { title: entry.entryTitle } : {}),
    requireLogin: [{ name: 'Beta Users' }],
  },
  {
    contentTypeID: 'genericPage',
    component: Loadable({
      loader: () => {
        return import('~/pages/Article');
      },
      loading: Loading,
    }),
    requireLogin: true,
  },
];
