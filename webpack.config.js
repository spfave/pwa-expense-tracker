const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
  mode: 'development',
  entry: {
    index: '/public/assets/js/index.js',
  },
  output: {
    path: __dirname + '/public/dist',
    filename: '[name].bundle.js',
  },
  plugins: [
    new WebpackPwaManifest({
      filename: 'manifest.webmanifest',
      inject: false,
      fingerprints: false,

      name: 'Expense Tracker',
      short_name: 'Expenses',
      description:
        'PWA application for tracking expense costs and maintaining a running budget balance',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      start_url: '/',
      display: 'standalone',

      icons: [
        {
          src: path.resolve(
            __dirname,
            'public/assets/images/icons/icon-512x512.png'
          ),
          size: [72, 96, 128, 144, 152, 192, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],
};

module.exports = config;
