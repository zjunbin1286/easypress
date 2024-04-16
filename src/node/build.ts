import { build as viteBuild, InlineConfig } from 'vite';
import path, { dirname, join } from 'path';
import fs from 'fs-extra';
import type { RollupOutput } from 'rollup';
// import ora from 'ora';
import { pathToFileURL } from 'url';
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants';
import { SiteConfig } from 'shared/types';
import { createVitePlugins } from './vitePlugins';
import { Route } from './plugin-routes';
import { RenderResult } from 'runtime/ssr-entry';

/**
 * 打包逻辑
 * @param root 路径
 * @returns
 */
export async function bundle(root: string, config: SiteConfig) {
  // * 公用配置抽离
  const resolveViteConfig = async (
    isServer: boolean
  ): Promise<InlineConfig> => ({
    mode: 'production',
    root,
    plugins: await createVitePlugins(config, undefined, isServer),
    ssr: {
      noExternal: ['react-router-dom', 'lodash-es']
    },
    build: {
      minify: false,
      ssr: isServer,
      outDir: isServer ? path.join(root, '.temp') : path.join(root, 'build'),
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? 'cjs' : 'esm'
        }
      }
    }
  });

  // const spinner = ora();
  // spinner.start('Building client + server bundles...'); // ora：加载动画

  try {
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      viteBuild(await resolveViteConfig(false)),
      // server build
      viteBuild(await resolveViteConfig(true))
    ]);
    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput];
  } catch (err) {
    console.log(err);
  }
}

/**
 * 服务端渲染
 * @param render ssr渲染
 * @param root 根路径
 * @param clientBundle 客户端包
 */
export async function renderPage(
  render: (url: string) => RenderResult,
  routes: Route[],
  root: string,
  clientBundle: RollupOutput
) {
  console.log('Rendering page in server side...');
  // 获取客户端JS脚本
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  );
  return Promise.all(
    routes.map(async (route) => {
      const routePath = route.path;
      // 获取ssr渲染的字符串
      const { appHtml, islandToPathMap, propsData } = await render(routePath);
      const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>title</title>
        <meta name="description" content="xxx">
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script type="module" src="/${clientChunk?.fileName}"></script>
      </body>
    </html>`.trim();
      const fileName = routePath.endsWith('/')
        ? `${routePath}index.html`
        : `${routePath}.html`;
      await fs.ensureDir(join(root, 'build', dirname(fileName)));
      await fs.writeFile(join(root, 'build', fileName), html);
      // await fs.remove(join(root, '.temp'));
    })
  );
}

/**
 * 打包构建函数
 * @param root 根路径
 */
export async function build(root: string = process.cwd(), config: SiteConfig) {
  // 1. 打包代码，包括 client 端 + server 端
  // const [clientBundle, serverBundle] = await bundle(root);
  const [clientBundle] = await bundle(root, config);
  // 2. 引入 server-entry 入口模块
  const serverEntryPath = join(root, '.temp', 'ssr-entry.js');
  // 3. 服务端渲染，产出
  const { render, routes } = await import(
    pathToFileURL(serverEntryPath).toString()
  );
  try {
    await renderPage(render, routes, root, clientBundle);
  } catch (e) {
    console.log('Render page error.\n', e);
  }
}
