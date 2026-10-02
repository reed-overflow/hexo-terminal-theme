'use strict';

hexo.extend.generator.register('terminal-indexes', function (locals) {
  const pages = locals.pages.toArray();
  const routes = [];
  for (const kind of ['categories', 'tags']) {
    const path = kind + '/index.html';
    if (!pages.some(page => page.path === path)) {
      routes.push({ path, layout: [kind, 'page'], data: { terminal_index: kind } });
    }
  }
  if (!pages.some(page => page.path === '404.html')) {
    routes.push({ path: '404.html', layout: ['404', 'page'], data: { title: '404', layout: '404' } });
  }
  return routes;
});

hexo.extend.generator.register('terminal-search', function (locals) {
  const settings = hexo.theme.config.search || {};
  if (settings.enabled === false) return;
  const strip = hexo.extend.helper.get('strip_html');
  const urlFor = hexo.extend.helper.get('url_for');
  const context = { config: hexo.config };
  const contentLength = Math.max(0, Number(settings.content_length) || 20000);
  const posts = locals.posts.sort('-date').toArray().filter(post => post.published !== false).map(post => ({
    title: post.title || '',
    url: urlFor.call(context, post.path),
    date: post.date.format('YYYY-MM-DD'),
    tags: post.tags.toArray().map(tag => tag.name),
    categories: post.categories.toArray().map(category => category.name),
    content: strip(String(post.content || '')).replace(/\s+/g, ' ').trim().slice(0, contentLength)
  }));
  const path = String(settings.path || 'terminal-search.json').replace(/^\/+/, '');
  return { path, data: JSON.stringify(posts) };
});
