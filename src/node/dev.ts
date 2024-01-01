import { createServer as createViteDevServer } from "vite";

export async function createDevServer(root = process.cwd()) {
  // 创建 server
  return createViteDevServer({
    root,
  });
}
