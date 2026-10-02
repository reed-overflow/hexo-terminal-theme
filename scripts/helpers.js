'use strict';

const words = {
  en: {
    home: 'Home', archives: 'Archives', categories: 'Categories', tags: 'Tags',
    search: 'Search', search_hint: 'Search posts, tags, ideas…', search_idle: 'Type to search your corner of the internet.',
    search_empty: 'No matching posts. Try another word.', search_loading: 'Loading the index…', search_error: 'Could not load search. Please try again.',
    close: 'Close', menu: 'Toggle navigation', theme: 'Switch color theme', skip: 'Skip to content',
    posts: 'posts', articles: 'Latest entries', entries: 'entries', read: 'Read entry', minutes: 'min read',
    about: 'About the author', recent: 'Recent entries', topics: 'Explore topics', all: 'View all',
    toc: 'On this page', published: 'Published', updated: 'Updated', previous: 'Newer entry', next: 'Older entry',
    newer: 'Newer', older: 'Older', page: 'Page', of: 'of', empty: 'Nothing here yet.',
    empty_hint: 'A new story starts with the first line.', copy: 'Copy', copied: 'Copied!', copy_error: 'Select to copy',
    copyright: 'Written by', license: 'Licensed under', back_top: 'Back to top', powered: 'Powered by',
    not_found: 'Path not found.', not_found_hint: 'This page may have moved, or the path never existed.',
    back_home: 'Back to home', results: 'results', comments: 'Discussion', untitled: 'Untitled',
    terminal_hint: 'Search the journal', archive_hint: '',
    categories_hint: '', tags_hint: '',
    rss: 'Subscribe via RSS', site_nav: 'Main navigation', pagination: 'Pagination', permalink: 'Link to this section'
  },
  zh: {
    home: '首页', archives: '归档', categories: '分类', tags: '标签',
    search: '搜索', search_hint: '搜索文章、标签、灵感…', search_idle: '输入关键词，查找这里的点滴记录。',
    search_empty: '没有找到相关文章，换个关键词试试。', search_loading: '正在加载索引…', search_error: '搜索加载失败，请重试。',
    close: '关闭', menu: '展开或收起导航', theme: '切换配色模式', skip: '跳转到正文',
    posts: '篇文章', articles: '最近更新', entries: '条记录', read: '阅读文章', minutes: '分钟阅读',
    about: '关于作者', recent: '最近文章', topics: '探索标签', all: '查看全部',
    toc: '文章目录', published: '发布于', updated: '更新于', previous: '上一篇', next: '下一篇',
    newer: '上一页', older: '下一页', page: '第', of: '/', empty: '这里还没有内容。',
    empty_hint: '每一个故事，都从第一行开始。', copy: '复制', copied: '已复制！', copy_error: '请选中后复制',
    copyright: '本文作者', license: '许可协议', back_top: '返回顶部', powered: '基于',
    not_found: '找不到这个路径。', not_found_hint: '页面可能已经搬家，或这个路径从未存在。',
    back_home: '返回首页', results: '条结果', comments: '评论与讨论', untitled: '未命名',
    terminal_hint: '搜索这本日志', archive_hint: '',
    categories_hint: '', tags_hint: '',
    rss: '通过 RSS 订阅', site_nav: '主导航', pagination: '分页导航', permalink: '此章节的永久链接'
  }
};

hexo.extend.helper.register('tr', function (key) {
  const language = this.page.lang || this.page.language || this.config.language || 'en';
  const locale = String(Array.isArray(language) ? language[0] : language).toLowerCase().startsWith('zh') ? 'zh' : 'en';
  return words[locale][key] || key;
});

hexo.extend.helper.register('terminal_text', function (html, length) {
  const plain = this.strip_html(String(html || '')).replace(/\s+/g, ' ').trim();
  return length && plain.length > length ? plain.slice(0, length) + '…' : plain;
});

hexo.extend.helper.register('reading_time', function (content) {
  const plain = this.strip_html(String(content || ''));
  const cjk = (plain.match(/[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]/g) || []).length;
  const other = plain.replace(/[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil((cjk + other) / Math.max(1, Number((this.theme.post || {}).reading_speed) || 250)));
});

hexo.extend.helper.register('terminal_url', function (value) {
  const url = String(value || '').trim();
  if (!url || /[\u0000-\u0020\\]/.test(url)) return '';
  if (/^(https?:\/\/|mailto:)/i.test(url)) return url;
  if (/^[a-z][a-z\d+.-]*:/i.test(url) || url.startsWith('//')) return '';
  return this.url_for(url);
});

hexo.extend.helper.register('terminal_https', function (value) {
  try {
    const url = new URL(String(value || ''));
    return url.protocol === 'https:' ? url.href : '';
  } catch (_) { return ''; }
});

hexo.extend.helper.register('terminal_title', function () {
  if (this.page.terminal_index === 'categories') return this.tr('categories');
  if (this.page.terminal_index === 'tags') return this.tr('tags');
  if (this.is_category()) return this.page.category;
  if (this.is_tag()) return '#' + this.page.tag;
  if (this.is_archive()) return this.tr('archives') + (this.page.year ? ' / ' + this.page.year + (this.page.month ? ' / ' + this.page.month : '') : '');
  return this.page.title || this.config.title || 'Terminal';
});
