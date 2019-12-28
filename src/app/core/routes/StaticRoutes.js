// import React from 'react';
import Loadable from 'react-loadable';
import { Loading } from './Loading';
import Homepage from '~/pages/Home/Homepage';

export default [
  {
    path: '/',
    exact: true,
    component: Homepage,
  },
  // ********************************
  // ˅˅ Do not delete these routes ˅˅
  {
    path: '/404',
    exact: true,
    component: Loadable({
      loader: () => import(/* webpackChunkName: "404" */ '~/pages/NotFound'),
      loading: Loading,
    }),
  },
  {
    path: '/zenInfo',
    exact: true,
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "VersionInfo" */ '~/pages/VersionInfo'),
      loading: Loading,
    }),
  },
  // ˄˄ Do not delete these routes ˄˄
  // ********************************
  // {
  //   path: '/search',
  //   exact: false,
  //   component: Loadable({
  //     loader: () => import('~/pages/SearchResults'),
  //     loading: Loading,
  //   }),
  // },
];
