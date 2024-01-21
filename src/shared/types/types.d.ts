// 声明虚拟模块
declare module 'easypress:site-data' {
  import type { UserConfig } from 'shared/types';
  const siteData: UserConfig;
  export default siteData;
}

declare module 'easypress:routes' {
  import type { Route } from 'node/plugin-routes';
  export const routes: Route[];
}
