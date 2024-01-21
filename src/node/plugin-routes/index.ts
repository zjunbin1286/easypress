import { Plugin } from 'vite';
import { RouteService } from './RouteService';

// 本质: 把文件目录结构 -> 路由数据

export interface Route {
  path: string;
  element: React.ReactElement;
  filePath: string;
}

interface PluginOptions {
  root: string;
}

export const CONVENTIONAL_ROUTE_ID = 'easypress:routes';

/**
 * 插件功能：包装约定式路由的核心数据，直接通过一行 import 语句就能获取路由数据
 * @param options
 * @returns
 */
export function pluginRoutes(options: PluginOptions): Plugin {
  const routeService = new RouteService(options.root);

  return {
    name: 'easypress:routes',
    async configResolved() {
      // Vite 启动时，对 RouteService 进行初始化
      await routeService.init();
    },
    resolveId(id: string) {
      if (id === CONVENTIONAL_ROUTE_ID) {
        return '\0' + id;
      }
    },

    load(id: string) {
      if (id === '\0' + CONVENTIONAL_ROUTE_ID) {
        return routeService.generateRoutesCode();
      }
    }
  };
}
