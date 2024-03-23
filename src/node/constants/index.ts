import { join } from 'path';

export const PACKAGE_ROOT = join(__dirname, '..');

// 主题模板地址
export const DEFAULT_HTML_PATH = join(PACKAGE_ROOT, 'template.html');

// 客户端入口地址
export const CLIENT_ENTRY_PATH = join(
  PACKAGE_ROOT,
  'src',
  'runtime',
  'client-entry.tsx'
);

// ssr入口地址
export const SERVER_ENTRY_PATH = join(
  PACKAGE_ROOT,
  'src',
  'runtime',
  'ssr-entry.tsx'
);

export const MD_REGEX = /\.mdx?$/;
