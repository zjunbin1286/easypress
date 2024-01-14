import cac from 'cac';
import { build } from './build';
import { resolve } from 'path';

// 创建 cli 实例，并自动生成 help 信息
const cli = cac('easypress').version('0.0.1').help();

// 成子命令注册，root表示传入的参数
// 开发命令
cli
  .command('dev [root]', 'start dev server')
  .alias('dev')
  .action(async (root: string) => {
    const createServer = async () => {
      const { createDevServer } = await import('./dev.js');
      const server = await createDevServer(root, async () => {
        await server.close();
        await createServer();
      });
      await server.listen();
      server.printUrls();
    };
    await createServer();
  });

// 生产构建
cli
  .command('build [root]', 'build in production')
  .action(async (root: string) => {
    try {
      root = resolve(root);
      // 注册 build 的逻辑
      await build(root);
    } catch (e) {
      console.log(e);
    }
  });

// 调用 cli
cli.parse();

/**
 * 注册并调试 cli 工具
 * 1. 在 pakage.json 中声明 bin 字段
 * 2. 将命令注册到全局：npm link --force
 * 3. 输入命令：ep dev docs
 */
