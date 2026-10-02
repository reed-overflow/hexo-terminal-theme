'use strict';

const { access } = require('node:fs/promises');
const { join } = require('node:path');

const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const merge = (target, source) => {
  for (const [key, value] of Object.entries(source)) {
    if (['__proto__', 'constructor', 'prototype'].includes(key)) continue;
    // Lists replace defaults, and explicit false/empty values remain overrides.
    target[key] = isRecord(value)
      ? merge(isRecord(target[key]) ? target[key] : {}, value)
      : value;
  }
  return target;
};

const readConfig = async path => {
  try {
    await access(path);
  } catch (error) {
    if (error.code === 'ENOENT') return {};
    throw error;
  }
  // Use Hexo's YAML renderer rather than introducing a second YAML parser.
  const value = await hexo.render.render({ path });
  if (value == null) return {};
  if (!isRecord(value)) throw new TypeError(`Theme configuration must be a mapping: ${path}`);
  return value;
};

// Hexo only loads _config.<config.theme>.yml automatically. Older versions of
// this theme documented _config.terminal.yml regardless of the directory name.
hexo.extend.filter.register('before_generate', async function () {
  if (hexo.config.theme === 'terminal') return;
  const aliasPath = join(hexo.base_dir, '_config.terminal.yml');
  try {
    await access(aliasPath);
  } catch (error) {
    if (error.code === 'ENOENT') return; // Keep native loading when no alias exists.
    throw error;
  }

  // Re-read each layer so regeneration does not retain removed alias settings.
  const layers = await Promise.all([
    readConfig(join(hexo.theme_dir, '_config.yml')),
    readConfig(aliasPath),
    readConfig(join(hexo.base_dir, `_config.${hexo.config.theme}.yml`))
  ]);
  layers.push(isRecord(hexo.config.theme_config) ? hexo.config.theme_config : {});
  hexo.theme.config = layers.reduce(merge, {});
}, 0);
