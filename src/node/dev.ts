import { createServer as createViteDevServer } from 'vite';
import { pluginIndexHtml } from './plugin-easypress/indexHtml';
import pluginReact from '@vitejs/plugin-react';
import { PACKAGE_ROOT } from './constants';

export async function createDevServer(root = process.cwd()) {
  // 创建 server
  return createViteDevServer({
    // root: 命令参数（ep dev docs 中的 docs）
    root,
    // 注册插件
    plugins: [pluginIndexHtml(), pluginReact()],
    server: {
      fs: {
        allow: [PACKAGE_ROOT] // 项目根目录下的文件都是合法的
      }
    }
  });
}
