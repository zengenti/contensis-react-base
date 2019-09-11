//import React from 'react';
import Loadable from 'react-loadable';
import { Loading } from './Loading';

export default [
  {
    contentTypeID: 'homepage',
    component: Loadable({
      loader: () => {
        return import('app/pages/Home/HomePage');
      },
      loading: Loading,
    }),
  },
  {
    contentTypeID: 'contentPage',
    component: Loadable({
      loader: () => {
        return import('app/pages/ContentPage/ContentPage');
      },
      loading: Loading,
    }),
  },
  {
    contentTypeID: 'landing',
    component: Loadable({
      loader: () => {
        return import('app/pages/Landing/Landing');
      },
      loading: Loading,
    }),
  },
  {
    contentTypeID: 'search',
    component: Loadable({
      loader: () => {
        return import('app/pages/Search/Search');
      },
      loading: Loading,
    }),
  },
  {
    contentTypeID: 'listing',
    component: Loadable({
      loader: () => {
        return import('app/pages/Listing/ListingPage');
      },
      loading: Loading,
    }),
  },
  {
    contentTypeID: 'news',
    component: Loadable({
      loader: () => {
        return import('app/pages/NewsArticle/NewsArticle');
      },
      loading: Loading,
    }),
  },
  {
    contentTypeID: 'event',
    component: Loadable({
      loader: () => {
        return import('app/pages/EventPage/EventPage');
      },
      loading: Loading,
    }),
  },
  {
    contentTypeID: 'course',
    component: Loadable({
      loader: () => {
        return import('app/containers/CourseRecordPage/CourseRecordPage');
      },
      loading: Loading,
    }),
  },
];
