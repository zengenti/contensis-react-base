// import React from 'react';
import Loadable from 'react-loadable';
import { Loading } from './Loading';
import Homepage from '~/pages/Home/Homepage';

export default [
  {
    path: '/',
    exact: true,
    fetchNode: true,
    ssr: true,
    component: Homepage,
  },
  {
    path: '/account/login',
    exact: true,
    ssr: false,
    component: Loadable({
      loader: () => import('~/pages/User/Login'),
      loading: Loading,
    }),
  },
  {
    path: '/account/access-denied',
    exact: true,
    ssr: false,
    component: Loadable({
      loader: () => import('~/pages/User/AccessDeniedPage'),
      loading: Loading,
    }),
  },
  {
    path: '/account/registration',
    exact: true,
    ssr: false,
    component: Loadable({
      loader: () => import('~/pages/User/RegistrationPage'),
      loading: Loading,
    }),
  },
  {
    path: '/account/registration/success',
    exact: true,
    ssr: false,
    component: Loadable({
      loader: () => import('~/pages/User/RegistrationPage'),
      loading: Loading,
    }),
  },
  {
    path: '/help-and-docs/*',
    fetchNode: true,
    exact: false,
    ssr: true,
    requireLogin: true,
    component: Loadable({
      loader: () => import('~/pages/Article'),
      loading: Loading,
    }),
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
    requireLogin: false,
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
