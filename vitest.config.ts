import { defineConfig } from 'vitest/config';

// 单元测试配置
export default defineConfig({
  test: {
    environment: 'node', // 环境
    passWithNoTests: true,
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'], // 不包括
    threads: true // 开启多线程模式
  }
});
