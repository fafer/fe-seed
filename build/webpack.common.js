const path = require('path');
const conf = require('./conf');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const minChunks = Object.keys(conf.ENTRY).length + 1;

module.exports = {
    entry: Object.assign(conf.ENTRY, {
        vendor: ['react', 'react-dom']
    }),
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: path.join(conf.ROOT_PATH, 'node_modules')
            },
            {
                test: /\.jsx?$/,
                exclude: path.join(conf.ROOT_PATH, 'node_modules'),
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                            plugins: [
                                "@babel/plugin-transform-runtime"
                            ]
                        }
                    },
                    {
                        loader: 'mock-loader'
                    }
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
                        publicPath:conf.IMGPUBLICPATH
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
                    chunks: "initial",
                    minChunks: minChunks
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