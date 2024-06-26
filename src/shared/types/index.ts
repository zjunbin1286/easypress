import { UserConfig as ViteConfiguration } from 'vite';
import { ComponentType } from 'react';

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

// 用户配置文件
export interface UserConfig {
  title?: string;
  description?: string;
  themeConfig?: ThemeConfig;
  vite?: ViteConfiguration; // vite 原生配置
}

// 站点配置（用户配置的超集，包含的内容会比较全面，是配置解析的最终结果）
export interface SiteConfig {
  root: string; // 项目根目录
  configPath: string; // 配置文件路径
  siteData: UserConfig; // 站点数据
}

export type PageType = 'home' | 'doc' | 'custom' | '404';

export interface Header {
  id: string;
  text: string;
  depth: number;
}

export interface FrontMatter {
  title?: string;
  description?: string;
  pageType?: PageType;
  sidebar?: boolean;
  outline?: boolean;
  // 增加 features 和 hero 的类型
  features?: Feature[];
  hero?: Hero;
}

export interface PageData {
  siteData: UserConfig;
  pagePath: string;
  frontmatter: FrontMatter;
  pageType: PageType;
  toc?: Header[];
  title?: string;
}

export interface PageModule {
  default: ComponentType;
  frontmatter?: FrontMatter;
  toc?: Header[];
  title?: string;
  [key: string]: unknown;
}

export interface Feature {
  icon: string;
  title: string;
  details: string;
}

export interface Hero {
  name: string;
  text: string;
  tagline: string;
  image?: {
    src: string;
    alt: string;
  };
  actions: {
    text: string;
    link: string;
    theme: 'brand' | 'alt';
  }[];
}

export type PropsWithIsland = {
  __island?: boolean;
};
