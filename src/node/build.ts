import pluginReact from '@vitejs/plugin-react';
import { build as viteBuild, InlineConfig } from 'vite';
import { join } from 'path';
import fs from "fs-extra";
import type { RollupOutput } from 'rollup'
import ora from 'ora'
import { pathToFileURL } from 'url';
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from "./constants";

/**
 * 打包逻辑
 * @param root 路径
 * @returns 
 */
export async function bundle(root: string) {

  // * 公用配置抽离
  const resolveViteConfig = (isServer: boolean): InlineConfig => ({
    mode: "production", // 生产环境构建
    root, // 根目录
    // 注意加上这个插件，自动注入 import React from 'react'，避免 React is not defined 的错误
    plugins: [pluginReact()],
    build: {
      ssr: isServer,
      outDir: isServer ? ".temp" : "build", // 输出产物目录
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH, // 打包入口
        output: {
          format: isServer ? "cjs" : "esm", // 打包格式（服务端运行在nodeJS，可以用cjs）
        },
      },
    },
  })

  const spinner = ora();
  spinner.start('Building client + server bundles...'); // ora：加载动画

  try {
    // * Promise.all 并发优化
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      viteBuild(resolveViteConfig(false)),
      // server build
      viteBuild(resolveViteConfig(true)),
    ]);
    spinner.stop()
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
  render: () => string,
  root: string,
  clientBundle: RollupOutput
) {
  // 获取客户端JS脚本
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === "chunk" && chunk.isEntry
  );
  console.log(`Rendering page in server side...`);
  // 获取ssr渲染的字符串
  const appHtml = render();
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
    </html>
  `.trim();
  await fs.ensureDir(join(root, "build"));
  await fs.writeFile(join(root, "build/index.html"), html);
  await fs.remove(join(root, ".temp"));
}

/**
 * 打包构建函数
 * @param root 根路径
 */
export async function build(root: string = process.cwd()) {
  // 1. 打包代码，包括 client 端 + server 端
  const [clientBundle, serverBundle] = await bundle(root);
  // 2. 引入 server-entry 入口模块
  const serverEntryPath = join(root, ".temp", "ssr-entry.js");
  // 3. 服务端渲染，产出
  const { render } = (await import(pathToFileURL(serverEntryPath).toString()));
  await renderPage(render, root, clientBundle);
}