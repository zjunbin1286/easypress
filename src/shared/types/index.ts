import { UserConfig as ViteConfiguration } from 'vite';

export type NavItemWithLink = {
  text: string;
  link: string;
};

export interface Sidebar {
  [path: string]: SidebarGroup[];
}

export interface SidebarGroup {
  text?: string;
  items: SidebarItem[];
}

export type SidebarItem =
  | { text: string; link: string }
  | { text: string; link?: string; items: SidebarItem[] };

export interface ThemeConfig {
  nav?: NavItemWithLink[];
  sidebar?: Sidebar;
  footer?: Footer;
}

export interface Footer {
  message?: string;
  copyright?: string;
}

// 配置文件
export interface UserConfig {
  title?: string;
  description?: string;
  themeConfig?: ThemeConfig;
  vite?: ViteConfiguration; // vite 原生配置
}
