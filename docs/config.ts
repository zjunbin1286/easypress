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
        link: "/guide/getting-started"
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          items: [
            {
              text: '快速开始',
              link: '/guide/getting-started'
            },
            {
              text: '配置站点',
              link: '/guide/configure-site'
            },
          ]
        },
        {
          text: '架构',
          items: [
            {
              text: 'SPA 和 MPA 对比',
              link: '/guide/spa-vs-mpa'
            },
            {
              text: '孤岛架构',
              link: '/guide/islands-arch'
            },
          ]
        },
      ]
    }
  },
})
