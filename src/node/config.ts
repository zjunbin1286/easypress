import { resolve } from 'path';
import fs from 'fs-extra';
import { loadConfigFromFile } from 'vite';
import { UserConfig } from '../shared/types/index';

// 读取的文件类型
type RawConfig =
  | UserConfig
  | Promise<UserConfig>
  | (() => UserConfig | Promise<UserConfig>);

/**
 * ! 解析配置文件
 * @param root 根目录
 * @param command 命令
 * @param mode 模式
 * @returns [配置文件路径, 配置文件内容]
 */
export async function resolveConfig(
  root: string,
  command: 'serve' | 'build',
  mode: 'development' | 'production'
) {
  // 1. 获取配置文件路径，支持 js、ts 格式
  const configPath = getUserConfigPath(root);
  // 2. 读取配置文件的内容
  const result = await loadConfigFromFile(
    {
      command,
      mode
    },
    configPath,
    root
  );
  if (result) {
    const { config: rawConfig = {} as RawConfig } = result;
    // 三种情况: 1. object  2. promise  3. function
    const userConfig = await (typeof rawConfig === 'function'
      ? rawConfig()
      : rawConfig);
    return [configPath, userConfig] as const;
  } else {
    return [configPath, {} as UserConfig] as const;
  }
}

/**
 * * 获取配置文件路径，支持 js、ts 格式
 * @param root 根目录
 * @returns 配置文件路径
 */
function getUserConfigPath(root: string) {
  try {
    // 支持的文件类型
    const supportConfigFiles = ['config.ts', 'config.js'];
    // 获取文件路径并返回
    const configPath = supportConfigFiles
      .map((file) => resolve(root, file))
      .find(fs.pathExistsSync);
    return configPath;
  } catch (e) {
    console.error(`Failed to load user config: ${e}`);
    throw e;
  }
}
