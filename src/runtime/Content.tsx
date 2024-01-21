import React from 'react';
import { useRoutes } from 'react-router-dom';
import A from '../../docs/guide/a';
import B from '../../docs/b';
import Index from '../../docs/guide';

const routes = [
  {
    path: '/guide',
    element: <Index />
  },
  {
    path: '/guide/a',
    element: <A />
  },
  {
    path: '/b',
    element: <B />
  }
];

// 路由组件
export const Content = () => {
  const routeElement = useRoutes(routes);
  return routeElement;
};
