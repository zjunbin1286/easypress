import { useRoutes } from 'react-router-dom';

import { routes } from 'easypress:routes';

// 路由组件
export const Content = () => {
  console.log('routes-----', routes);

  const routeElement = useRoutes(routes);
  return routeElement;
};
