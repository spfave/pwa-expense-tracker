const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
  mode: 'production',
  entry: {
    index: '/public/assets/js/index.js',
  },
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    filename: path.join('assets', 'js', '[name].bundle.js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  plugins: [
    new WebpackPwaManifest({
      filename: 'manifest.json',
      inject: false,
      fingerprints: false,
      publicPath: './',

      name: 'Expense Tracker',
      short_name: 'Expenses',
      description:
        'PWA application for tracking expense costs and maintaining a running budget balance',
      theme_color: '#1a7431',
      background_color: '#ffffff',
      start_url: '/',
      display: 'standalone',

      icons: [
        {
          src: path.resolve('public/assets/images/icons/icon-512x512.png'),
          size: [72, 96, 128, 144, 152, 192, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],
};

module.exports = config;
