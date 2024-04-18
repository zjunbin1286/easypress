import { join } from 'path';

export const PACKAGE_ROOT = join(__dirname, '..');

export const RUNTIME_PATH = join(PACKAGE_ROOT, 'src', 'runtime');

// 主题模板地址
export const DEFAULT_HTML_PATH = join(PACKAGE_ROOT, 'template.html');

// 客户端入口地址
export const CLIENT_ENTRY_PATH = join(RUNTIME_PATH, 'client-entry.tsx');

// ssr入口地址
export const SERVER_ENTRY_PATH = join(RUNTIME_PATH, 'ssr-entry.tsx');

export const MD_REGEX = /\.mdx?$/;

export const PUBLIC_DIR = 'public';

export const MASK_SPLITTER = '!!ISLAND!!';

export const EXTERNALS = [
  'react',
  'react-dom',
  'react-dom/client',
  'react/jsx-runtime'
];
