# hexo-terminal-theme

一个受传统终端与 Unix 文本工具启发的自用 Hexo 主题。等宽字体、用户与主机提示符、方括号导航和日志式分隔，搭配清晰的阅读排版、响应式布局和键盘操作。界面采用直角文本终端风格，加入荧光屏 bloom 辉光、静态扫描线与像素细节。

默认不加载远程字体、图标库或前端框架。搜索在访客浏览器内完成，评论和访客计数器按需启用。

正文默认桌面端 18px、手机端 17px，摘要与导航 16px，日期、标签、目录等辅助信息至少 14px（以浏览器默认字号为基准）。字号使用 `rem`，跟随浏览器字体设置；正文行高为 1.85，最大行宽为 72ch。窄屏通过重排内容适配，保留可读字号。光标短暂闪烁后静止，启用“减少动态效果”时不闪烁。

## Demo
[示例网站](https://redx.top/)


## 功能

- 首页文章摘要、阅读时长、分类、标签和分页。
- 文章、独立页面、按年/月归档、分类详情、标签详情及 404 页面。
- 自动生成 `/categories/` 与 `/tags/` 索引，展示嵌套分类和标签文章数量。
- 桌面双栏、平板与手机自动重排；手机折叠导航、可展开目录。
- 跟随系统的深浅色模式，手动切换后在浏览器中保存偏好；绿色、琥珀色、青色三种强调色。
- 随强调色变化的 bloom 辉光、像素终端标记、分段光标与点状导航下划线；两组效果可独立关闭。
- 本地全文搜索：按标题、标签、分类、正文排序，多关键词匹配，结果高亮与键盘导航。
- 文章目录、阅读进度、代码复制、代码高亮样式、上下篇导航、文章版权、返回顶部。
- 自定义作者信息、GitHub / 社交平台 / 邮箱等外链、RSS 入口。
- 通过 HTTPS 图片或 iframe 接入访客计数器，包括 `count.getloli.com`。
- 可选 Giscus 评论，自动跟随主题深浅色。
- 中文、英文界面，基础 Open Graph 元数据、canonical、打印样式。
- 键盘焦点样式、跳转正文链接、搜索弹窗焦点管理、减少动态效果偏好支持。

## 安装

需要 Node.js 18+、Hexo 7+。**本目录是主题，不是独立的 Hexo 站点**。

1. 将本目录完整复制到已有 Hexo 项目的 `themes/hexo-terminal-theme/`。
2. 在 **Hexo 站点根目录**安装 EJS 渲染器及常用生成器。标准 `hexo init` 项目通常已经包含这些依赖：

   ```sh
   npm install hexo-renderer-ejs hexo-renderer-marked hexo-generator-index hexo-generator-archive hexo-generator-category hexo-generator-tag
   ```

3. 修改站点根目录的 `_config.yml`：

   ```yaml
   title: reed-overflow.log
   subtitle: Notes from the terminal
   description: 关于代码、生活与好奇心的个人记录。
   author: reed-overflow
   language: zh-CN
   timezone: Asia/Shanghai
   url: https://example.com
   root: /
   theme: hexo-terminal-theme

   per_page: 10
   pagination_dir: page

   highlight:
     enable: true
     line_number: true
     auto_detect: false
     tab_replace: '  '
     wrap: true
     hljs: false
   prismjs:
     enable: false
   ```

4. 将主题的 `_config.yml` 复制为 **站点根目录**的 `_config.hexo-terminal-theme.yml`，并修改作者、导航、外链等设置。覆盖文件名必须与站点 `theme` 值一致：`theme: terminal` 对应 `_config.terminal.yml`，`theme: hexo-terminal-theme` 对应 `_config.hexo-terminal-theme.yml`。这样升级主题不会覆盖个人配置。
5. 正常使用 Hexo 发布站点：

   ```sh
   npx hexo clean
   npx hexo generate
   npx hexo server
   ```

以上命令为使用说明，本次开发未执行测试或构建。

部署到子目录时，例如 `https://example.com/blog/`，请将站点 `url` 设置为完整地址，并将 `root` 设置为 `/blog/`。主题资源、导航和搜索索引路径会使用 Hexo 的 URL helper 处理。修改配置后请清理并重新生成站点。

## 主题配置

完整选项及注释见 [`_config.yml`](./_config.yml)。以下均填写在站点根目录的 `_config.hexo-terminal-theme.yml` 中（对应 `theme: hexo-terminal-theme`）。

旧版说明使用的 `_config.terminal.yml` 也兼容读取。配置优先级从低到高为：主题目录 `_config.yml` → 站点根目录 `_config.terminal.yml` → 站点根目录 `_config.<theme>.yml` → 站点配置中的 `theme_config`。嵌套配置逐项合并，列表整体替换，`false` 和空字符串会保留。建议只维护一个主题覆盖文件，避免高优先级配置覆盖修改。

修改配置后重启 Hexo 并重新生成站点。仅修改 `appearance.mode` 时，浏览器保存的访客配色偏好仍然优先；这不影响其他配置项的覆盖。

### 辉光与像素效果

```yaml
terminal:
  bloom: true
  pixels: true
  show_grid: false
```

`bloom` 默认开启，为标题、命令提示符、当前导航和光标添加随强调色变化的荧光辉光，浅色模式自动减弱。正文不添加辉光。

`pixels` 默认开启，加入静态扫描线、标题区底部像素网格、阶梯状 `>_` 标记、分段光标和点状导航下划线。扫描线位于内容后方，不覆盖正文图片。额外开启 `show_grid` 可在页面外围显示方形点阵。

两项分别设为 `false` 可独立关闭；同时关闭可恢复原有文本终端外观。效果通过本地 CSS 实现，无需远程字体、Canvas 或持续动画。高对比度模式关闭纹理与辉光，打印时不加载效果样式；光标继续遵循减少动态效果偏好。

### 作者与外链

```yaml
author:
  name: reed-overflow
  bio: 开发者 / 开源爱好者 / 终身学习者
  avatar: /images/avatar.jpg
  location: Shanghai, CN
  status: Building something interesting

terminal:
  user: reed-overflow
  host: personal.space
  title: reed-overflow@personal.space — zsh
  show_grid: false

social:
  - name: GitHub
    url: https://github.com/yourname
    icon: GH
  - name: Mastodon
    url: https://mastodon.social/@yourname
    icon: M
  - name: X / Twitter
    url: https://x.com/yourname
    icon: X
  - name: Bilibili
    url: https://space.bilibili.com/12345
    icon: B
  - name: Email
    url: mailto:hello@example.com
    icon: '@'
```

`social` 支持任意数量和任意平台。`icon` 是短字符标记，无需下载图标字体。将 `social` 设置为 `[]` 可移除所有默认外链。作者名称留空时使用 Hexo 站点的 `author`。

头像等自定义图片放在 **站点** `source/images/`，再填写 `/images/文件名`。也可以使用 HTTPS 图片地址。

### 首页与配色

```yaml
appearance:
  mode: auto # auto / dark / light
  accent: green # green / amber / cyan

hero:
  enabled: true
  eyebrow: A PERSONAL SPACE ON THE INTERNET
  title: Hello, world_
  description: 记录技术，也记录生活。欢迎来到我的数字小站。
  command: cat thoughts.md

sidebar:
  enabled: true
  recent_posts: 4 # 设为 0 隐藏最近文章
  tags: 12 # 设为 0 隐藏标签区块
```

首页介绍只出现在第一页。关闭侧栏后，文章区居中，文章目录仍通过可展开区块提供，社交外链会显示在页脚。

主题使用操作系统自带的等宽字体与中文后备字体。访客手动切换配色后优先使用保存的选择；清除浏览器的 `terminal-appearance` 本地存储项后重新遵循站点配置。

### 导航与独立页面

```yaml
menu:
  - name: home
    path: /
    command: ~/home
  - name: archives
    path: /archives/
    command: ./archives
  - name: categories
    path: /categories/
    command: ./categories
  - name: tags
    path: /tags/
    command: ./tags
  - name: 关于
    path: /about/
    command: whoami
```

`command` 是可见的终端风格导航文字，`name` 同时用于辅助阅读。内置 `home`、`archives`、`categories`、`tags` 名称会按站点语言翻译。

分类、标签总览页由主题自动生成。已有相同路径的独立页面时，主题不会再创建重复的索引；此时将对应页面的 front matter 设为 `layout: categories` 或 `layout: tags` 即可使用主题总览布局。

创建关于页：

```sh
npx hexo new page about
```

编辑 `source/about/index.md`：

```markdown
---
title: 关于我
layout: page
comments: false
---

你好，我是 reed-overflow

在这里记录写代码的过程，以及生活中值得记住的瞬间。
```

404 页面自动生成为 `404.html`。如果站点已有自定义 `source/404.md` 并配置了 `permalink: /404.html`，主题会保留该页面。部署平台需要启用自身的 404 页面机制，例如 GitHub Pages 会自动识别根目录的 `404.html`。

### 文章

```markdown
---
title: 我的第一篇终端日志
date: 2026-10-02 12:00:00
updated: 2026-10-03 09:00:00
categories:
  - 开发
  - Web
tags:
  - Hexo
  - JavaScript
description: 一段可选的文章摘要，也会用于页面描述。
cover: /images/cover.jpg
cover_alt: 文章封面图片描述
toc: true
comments: true
copyright: true
---

这里是文章开头。

<!-- more -->

## 第一个章节

这里是正文。
```

`cover` 等字段均可省略。首页摘要优先级为 `description` → `<!-- more -->` 摘要 → 正文纯文本截取。文章默认显示发布与更新日期、阅读时长、分类标签、目录和版权声明。

文章目录基于渲染后的标题生成；请使用 Markdown 标题语法。代码高亮由 Hexo 执行，主题提供高亮样式和复制按钮。代码、表格在窄屏上可以横向滚动。

阅读时长将中文字数和其他语言的词数合并估算，可通过 `post.reading_speed` 调整。修改 `post.license` 与 `post.license_url` 可替换版权协议，也可设置 `post.copyright: false` 全局关闭版权区块。独立文章的 `toc`、`comments`、`copyright` 设置为 `false` 时关闭对应功能。

### 访客计数器

使用 [Moe Counter](https://count.getloli.com/) 的图片接口：

```yaml
counter:
  enabled: true
  type: image
  url: 'https://count.getloli.com/@your-unique-blog-name?theme=original'
  link: https://count.getloli.com/
  title: 来访记录
  width: 300
  height: 100
```

将 `your-unique-blog-name` 替换为你自己的唯一标识，也可以直接粘贴服务生成的图片地址，包含 `?`、`&` 的地址建议加引号。`url` 必须是组件资源本身的地址，而不是介绍页。第三方服务负责统计与展示，主题负责嵌入。

计数器显示在页脚，默认关闭并使用延迟加载。因此远程服务的访问次数取决于组件是否实际加载及服务自身规则，不等同于主题独立计算的 PV/UV。

如果服务提供嵌入页面：

```yaml
counter:
  enabled: true
  type: iframe
  url: https://your-counter.example/widget
  title: 访问统计
  width: 320
  height: 120
```

只接受 HTTPS 组件地址。iframe 使用 `sandbox="allow-scripts"`，不授予顶层导航等权限；依赖同源存储、Cookie 或禁止被嵌入的服务可能不适用，优先使用图片接口。`width` / `height` 调整展示尺寸；图片在小屏幕自动缩放。

### 搜索

```yaml
search:
  enabled: true
  path: terminal-search.json
  content_length: 20000
  limit: 30
```

无需安装搜索插件。Hexo 生成站点时输出本地 JSON 索引，访客首次输入搜索内容时获取索引，后续查询复用内存数据。输入多个词时，每个词都需要命中。标题匹配优先于标签、分类和正文；只显示前 `limit` 条结果。

快捷键：

| 操作 | 按键 |
| --- | --- |
| 打开搜索 | `/` 或 `Ctrl+K` / `⌘K` |
| 浏览结果 | `↑` / `↓` |
| 打开当前选中结果 | `Enter` |
| 关闭搜索 | `Esc` |

索引只包含文章，独立页面不加入搜索。索引是公开静态文件，请勿在文章中放置不希望公开的内容。`content_length` 为正整数，控制每篇正文索引长度；超出长度的正文不会参与查询。关闭搜索后建议 `hexo clean` 再生成，删除旧索引。

### RSS

在 Hexo 站点安装订阅生成器：

```sh
npm install hexo-generator-feed
```

在 **站点 `_config.yml`** 中配置：

```yaml
feed:
  type: atom
  path: atom.xml
  limit: 20
  content: true
```

在 **站点根目录的主题覆盖文件 `_config.hexo-terminal-theme.yml`** 中配置：

```yaml
rss: /atom.xml
```

主题只提供订阅入口与 feed 元数据，feed 内容由插件生成。

### Giscus 评论

先通过 [giscus.app](https://giscus.app/zh-CN) 配置 GitHub 仓库及 Discussions，再填写返回的参数：

```yaml
comments:
  enabled: true
  repo: yourname/yourrepo
  repo_id: YOUR_REPO_ID
  category: Announcements
  category_id: YOUR_CATEGORY_ID
  mapping: pathname
  lang: zh-CN
```

关闭时不加载 Giscus 脚本。启用并填齐参数后，文章和独立页面显示评论；页面可通过 front matter `comments: false` 关闭。

### 页脚

```yaml
footer:
  since: 2026
  text: Made of words, coffee & curiosity.
  icp: ''
  icp_url: https://beian.miit.gov.cn/
```

## 文件结构

```text
terminal/
├── _config.yml             # 主题设置与中文注释
├── layout/                 # EJS 布局、文章、归档、分类、标签等
│   └── _partial/           # 导航、侧栏、搜索、评论和页脚
├── scripts/
│   ├── config.js           # 兼容旧配置文件名，合并主题设置
│   ├── helpers.js          # 翻译、URL、阅读时长、摘要等
│   └── generators.js       # 分类/标签索引、404、搜索 JSON
├── source/
│   ├── css/terminal.css    # 样式、配色、响应式、打印
│   ├── css/effects.css     # bloom 辉光、扫描线与像素细节
│   ├── js/appearance.js    # 首屏配色设置
│   ├── js/terminal.js      # 搜索、复制、目录与页面交互
│   └── images/favicon.svg
├── package.json
└── LICENSE
```

中文界面使用 `language: zh-CN`；其他语言当前使用英文文案。首页介绍、作者简介、终端用户名等属于自定义内容，需要自行填写相应语言。

主题面向支持原生 `<dialog>`、CSS Grid 与现代 JavaScript 的浏览器。没有 JavaScript 时，文章、导航、归档、分类、标签及目录链接仍可使用；搜索、复制、配色切换和评论需要 JavaScript。

MIT License.
