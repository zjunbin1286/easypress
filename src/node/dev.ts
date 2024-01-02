import { createServer as createViteDevServer } from "vite";
import { pluginIndexHtml } from "./plugin-easypress/indexHtml";
import pluginReact from '@vitejs/plugin-react'

export async function createDevServer(root = process.cwd()) {
  // 创建 server
  return createViteDevServer({
    // root: 命令参数（ep dev docs 中的 docs）
    root,
    // 注册插件
    plugins: [pluginIndexHtml(), pluginReact()]
  });
}
