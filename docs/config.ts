import { defineConfig } from "../dist"

export default defineConfig({
  title: 'easypress',
  themeConfig: {
    nav: [
      {
        text: "主页",
        link: "/"
      },
      {
        text: "指南",
        link: "/guide/"
      },
      {
        text: "掘金-CoderBin",
        link: "https://juejin.cn/user/1627704066072712/posts",
      },
      {
        text: "博客",
        link: "https://zhu-junbin.gitee.io/blog",
      },
    ],
  },
})
