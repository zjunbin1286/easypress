import { defineConfig } from 'tsup';

export default defineConfig({
  // entry: ['src/node/cli.ts', 'src/node/index.ts', 'src/node/dev.ts'], // 入口
  bundle: true, // 使用 bundle
  splitting: true, // 开启拆白
  outDir: 'dist', // 产出目录
  format: ['cjs', 'esm'], // 打包格式
  dts: true, // 打包type
  shims: true, // 对 esm 和 cjs 的 api 进行 polyfill 代码导入
  clean: true, // 清空之前的构建产物
  minify: process.env.NODE_ENV === 'production',
  entryPoints: {
    cli: './src/node/cli.ts',
    index: './src/node/index.ts',
    dev: './src/node/dev.ts'
  }
});
