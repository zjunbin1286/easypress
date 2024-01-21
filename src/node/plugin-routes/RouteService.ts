// 你需要在项目中安装 fast-glob 包
import fastGlob from 'fast-glob';
import { normalizePath } from 'vite';
import path from 'path';

interface RouteMeta {
  routePath: string;
  absolutePath: string;
}

export class RouteService {
  // 初始化私有变量
  #scanDir: string;
  #routeData: RouteMeta[] = [];

  constructor(scanDir: string) {
    this.#scanDir = scanDir;
  }

  // 初始化
  async init() {
    // 扫描文件
    const files = fastGlob
      .sync(['**/*.{js,jsx,ts,tsx,md,mdx}'], {
        cwd: this.#scanDir,
        absolute: true,
        ignore: ['**/node_modules/**', '**/build/**', 'config.ts']
      })
      .sort();
    files.forEach((file) => {
      // window环境需要用 normalizePath
      const fileRelativePath = normalizePath(
        path.relative(this.#scanDir, file)
      );
      // 1. 路由路径
      const routePath = this.normalizeRoutePath(fileRelativePath);
      // 2. 文件绝对路径
      this.#routeData.push({
        routePath,
        absolutePath: file
      });
    });
  }

  // 模块代码生成的逻辑
  generateRoutesCode() {
    return `
      import React from 'react';
      import loadable from '@loadable/component';
      ${this.#routeData
        .map((route, index) => {
          return `const Route${index} = loadable(() => import('${route.absolutePath}'));`;
        })
        .join('\n')}
      export const routes = [
      ${this.#routeData
        .map((route, index) => {
          return `{ path: '${route.routePath}', element: React.createElement(Route${index}) }`;
        })
        .join(',\n')}
      ];
  `;
  }

  // 获取路由数据，方便测试
  getRouteMeta(): RouteMeta[] {
    return this.#routeData;
  }

  normalizeRoutePath(rawPath: string) {
    const routePath = rawPath.replace(/\.(.*)?$/, '').replace(/index$/, '');
    return routePath.startsWith('/') ? routePath : `/${routePath}`;
  }
}
