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
    sidebar: {
      '/guide/': [
        {
          text: '教程',
          items: [
            {
              text: '快速上手',
              link: '/guide/a'
            },
            {
              text: '如何安装',
              link: '/guide/b'
            },
            {
              text: '注意事项',
              link: '/guide/c'
            },
          ]
        },
      ]
    }
  },
})
