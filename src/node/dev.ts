import { createServer } from 'vite';
import { PACKAGE_ROOT } from './constants';
import { resolveConfig } from './config';
import { createVitePlugins } from './vitePlugins';

export async function createDevServer(
  root = process.cwd(),
  restartServer: () => Promise<void> // 重启回调
) {
  // 获取配置文件
  const config = await resolveConfig(root, 'serve', 'development');

  // 创建 server
  return createServer({
    // 注册插件
    plugins: createVitePlugins(config, restartServer),
    server: {
      fs: {
        allow: [PACKAGE_ROOT] // 项目根目录下的文件都是合法的
      }
    }
  });
}
