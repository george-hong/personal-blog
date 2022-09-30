/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'pages'),
      path.join(__dirname, 'components'),
    ],
    prependData: `@import '/styles/variable.scss';`
  },
  pageExtensions: [
    'page.tsx',
    'page.ts',
    'page.jsx',
    'page.js',
    'api.ts',
    'api.js',
  ],
}

module.exports = nextConfig
