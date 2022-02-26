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
  }
}

module.exports = nextConfig
