import type { PlaywrightTestConfig } from '@playwright/test';

// E2E 测试配置
const config: PlaywrightTestConfig = {
  testDir: './e2e', // 测试文件存放的目录
  timeout: 50000, // 指定超时的时间50s
  webServer: {
    url: 'http://localhost:5173', // 启动地址
    command: 'pnpm prepare:e2e' // 命令
  },
  use: {
    headless: true // 无ui界面的无头浏览器
  }
};

export default config;

/**
 * 1. 创建测试项目
 * 2. 启动测试项目
 * 3. 开启无头浏览器访问
 */
