const path = require('path');
const conf = require('./conf');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: conf.getEntry(),
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          fix: true,
          cache: process.env.NODE_ENV === 'production' ? true : false
        }
      },
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        use: [{
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
              plugins: [
                "@babel/plugin-transform-runtime",
                //Stage 2
                ["@babel/plugin-proposal-decorators", {
                  "legacy": true
                }],
                "@babel/plugin-proposal-function-sent",
                "@babel/plugin-proposal-export-namespace-from",
                "@babel/plugin-proposal-numeric-separator",
                "@babel/plugin-proposal-throw-expressions",
                "@babel/plugin-syntax-dynamic-import",
                //Stage 3
                "@babel/plugin-syntax-import-meta",
                ["@babel/plugin-proposal-class-properties", {
                  "loose": false
                }],
                "@babel/plugin-proposal-json-strings",
                ["@babel/plugin-transform-typescript", {
                  isTSX: true
                }]
              ]
            }
          },
          ...(() => process.env.MOCK_DATA === 'mock' ? [{
            loader: 'mock-loader',
            options: {
              enable: true
            }
          }] : [])()
        ]
      },
      {
        test: /\.scss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[path][name].[ext]',
            limit: 8192,
            publicPath: process.env.NODE_ENV === 'production' ? conf.IMGPUBLICPATH : conf.BASEPATH,
            emitFile: process.env.NODE_ENV === 'production' ? false : true
          }
        }]
      }
    ]
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'loaders')
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.jsx', '.tsx', '.css', '.scss'],
    alias: {
      '@': path.join(conf.ROOT_PATH, 'src')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks:'initial',
          test:/react|react-dom/,
          priority:10
        }
      }
    }
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: conf.COPY_PATH,
      to: conf.COPY_DEST_PATH
    }]),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css"
    })
  ]
}