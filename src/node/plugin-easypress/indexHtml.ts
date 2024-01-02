import { readFile } from "fs/promises";
import { Plugin } from "vite";
import { DEFAULT_HTML_PATH, CLIENT_ENTRY_PATH } from "../constants";

// 入口 HTML 处理
export function pluginIndexHtml(): Plugin {
  return {
    name: "easypress:index-html",
    apply: "serve",
    // 插入入口 script 标签
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              type: 'module',
              src: `/@fs/${CLIENT_ENTRY_PATH}`,
            },
            injectTo: 'body'
          }
        ]
      }
    },
    // configureServer 钩子
    configureServer(server) {
      return () => {
        // 自定义中间件
        server.middlewares.use(async (req, res, next) => {
          // 读取 HTML 模板内容
          let html = await readFile(DEFAULT_HTML_PATH, "utf-8");

          try {
            // 响应到浏览器
            // transformIndexHtml 配合 plugin-react 实现热更新
            html = await server.transformIndexHtml(req.url, html, req.originalUrl)
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(html);
          } catch (e) {
            return next(e);
          }
        });
      };
    },
  };
}
