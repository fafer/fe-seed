const path = require('path');
const conf = require('./conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: conf.getEntry(),
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js?v=[contenthash:8]',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.join(__dirname, '../src'), __dirname],
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.tsx?$/,
        include: [path.join(__dirname, '../src'), __dirname],
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          ...(() =>
            process.env.MOCK_DATA === 'mock'
              ? [{ loader: 'mock-loader', options: { enable: true } }]
              : [])(),
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: (loader) => [
                  require('postcss-import')({ root: loader.resourcePath }),
                  require('postcss-preset-env')(),
                  require('cssnano')(),
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name(filePath) {
                return filePath
                  .replace(conf.SRC_PATH, '')
                  .substring(1)
                  .replace(/\\/g, '/')
                  .replace(/\//g, conf.ENTRY_SEPERATE)
                  .toLocaleLowerCase();
              },
              limit: 8192,
              publicPath:
                process.env.NODE_ENV === 'production'
                  ? conf.IMGPUBLICPATH
                  : conf.BASEPATH,
              emitFile: true,
            },
          },
          {
            loader: 'img-loader',
            options: {
              plugins() {
                if (process.env.NODE_ENV === 'development') return [];
                return [
                  require('imagemin-gifsicle')({
                    interlaced: false,
                  }),
                  require('imagemin-mozjpeg')({
                    progressive: true,
                    arithmetic: false,
                  }),
                  require('imagemin-pngquant')({
                    floyd: 0.5,
                    speed: 2,
                  }),
                  require('imagemin-svgo')({
                    plugins: [
                      { removeTitle: true },
                      { convertPathData: false },
                    ],
                  }),
                ];
              },
            },
          },
        ],
      },
    ],
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.jsx', '.tsx', '.css', '.scss'],
    alias: {
      '@': conf.SRC_PATH,
    },
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require(path.join(conf.COPY_PATH, 'vendor-manifest.json')),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: conf.COPY_PATH,
          to: conf.COPY_DEST_PATH,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css?v=[contenthash:8]',
    }),
  ],
};
