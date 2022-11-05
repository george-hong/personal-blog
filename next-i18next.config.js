/**
 * i18n configuration
 *
 * Plugin registry url: https://github.com/i18next/next-i18next.
 *
 * Plugin example url: https://github.com/i18next/next-i18next/blob/master/examples/simple.
 *
 * @type {{i18n: {defaultLocale: string, locales: [string, string]}}}
 */
module.exports = {
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
  },
  // If true, locale will be update when page refreshed.
  // reloadOnPrerender: process.env.NODE_ENV === 'development',
};
