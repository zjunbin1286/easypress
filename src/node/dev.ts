import { createServer as createViteDevServer } from 'vite';
import { pluginIndexHtml } from './plugin-easypress/indexHtml';
import pluginReact from '@vitejs/plugin-react';
import { PACKAGE_ROOT } from './constants';
import { resolveConfig } from './config';
import { pluginConfig } from './plugin-easypress/config';

export async function createDevServer(
  root = process.cwd(),
  restart: () => Promise<void> // 重启回调
) {
  // 获取配置文件
  const config = await resolveConfig(root, 'serve', 'development');
  console.log(config.siteData);

  // 创建 server
  return createViteDevServer({
    // root: 命令参数（ep dev docs 中的 docs）
    root,
    // 注册插件
    plugins: [pluginIndexHtml(), pluginReact(), pluginConfig(config, restart)],
    server: {
      fs: {
        allow: [PACKAGE_ROOT] // 项目根目录下的文件都是合法的
      }
    }
  });
}
