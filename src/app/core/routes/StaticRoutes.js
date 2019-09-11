// import React from 'react';
// import Loadable from 'react-loadable';
// import { Loading } from './Loading';
import Search from 'app/pages/Search/Search';
import CourseSearchPage from 'app/pages/CourseSearchPage/CourseSearchPage';

export default [
  {
    path: '/search',
    exact: false,
    component: Search,
  },
  {
    path: '/study/courses',
    exact: false,
    component: CourseSearchPage,
  },
];
