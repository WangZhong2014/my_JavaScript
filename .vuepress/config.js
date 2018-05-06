module.exports = {
    title: '野蛮生长',
    description: '我的编程、产品成长之路',
    // dev 模式下不显示 favicon？
    base:'https://foo.github.io/bar/',
    serviceWorker: true,
    themeConfig: {
      repo: 'WangZhong2014/my_blog',
      editLinks: true,
      // 设置了上面的 repo 之后，顶部导航栏默认会显示 GitHub 链接
      // 无需在 nav 中再专门设置
      nav: [
        {
          text: '博客',
          link: '/index/',
        },
      ],
      // 在这里设置的 sidebar 的属性
      // 适用于所有页面
      // 当打开 sidebar 中定义的页面时
      // 则还会展开显示该页面的二级标题
      // 如果定义了下面的 sidebarDepth 属性为 2，就显示三级标题
      // 所有在 sidebar 中定义的文章
      // 在页面底部都会显示上一篇/下一篇 sidebar 中文章的链接
      // sidebar: [
      //   {
      //     title: '方法论',
      //     children:,
      //   }
      // ],
      // sidebarDepth: 2,
    }
  }
  