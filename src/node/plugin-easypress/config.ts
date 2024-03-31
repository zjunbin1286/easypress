import { Plugin } from 'vite';
import { join, relative } from 'path';
import { SiteConfig } from 'shared/types/index';
import { PACKAGE_ROOT } from '../../node/constants';
// 虚拟模块标识
const SITE_DATA_ID = 'easypress:site-data';

/**
 * 插件功能：让前端 UI 层也能访问到配置的数据
 * 插件的意义在于让前端可以通过虚拟模块的方式访问到 siteData 的内容
 * @param config
 * @returns
 */
export function pluginConfig(
  config: SiteConfig,
  restartServer?: () => Promise<void>
): Plugin {
  return {
    name: 'easypress:site-data',
    // 解析虚拟模块id的钩子
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        // Vite 中约定虚拟模块以 \0 开头
        return '\0' + SITE_DATA_ID;
      }
    },
    // node钩子中加载数据模块
    load(id) {
      if (id === '\0' + SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`;
      }
    },
    // 处理配置文件的热更新
    async handleHotUpdate(ctx) {
      // windows系统要更换路径
      const customWatchedFiles = [config.configPath.replaceAll('\\', '/')];

      const include = (id: string) =>
        customWatchedFiles.some((file) => id.includes(file));

      if (include(ctx.file)) {
        console.log(
          `\n${relative(config.root, ctx.file)} changed, restarting server...`
        );
        // 重点: 重启 Dev Server
        // 手动调用 dev.ts 中的 createServer，然后每次 import 新的产物
        await restartServer();
      }
    },
    // 新增插件钩子，config 钩子可以让我们自定义 Vite 配置，因此，我们之前指定的 root 参数也可以放到这个钩子中。
    config() {
      return {
        // root: PACKAGE_ROOT,
        resolve: {
          // 导入别名
          alias: {
            '@runtime': join(PACKAGE_ROOT, 'src', 'runtime', 'index.ts')
          }
        },
        css: {
          modules: {
            localsConvention: 'camelCaseOnly'
          }
        }
      };
    }
  };
}
