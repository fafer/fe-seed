const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Merge(CommonConfig, {
    mode:'development',
    output: {
        publicPath: `/${path.basename(__dirname)}/js/`
    },
    devtool: 'inline-source-map',
    devServer: {
        host: '0.0.0.0',
        port: 80,
        disableHostCheck: true,
        allowedHosts: [
            '.58.com',
            '.58cdn.com.cn'
        ],
        hot: true,
        contentBase: path.join(__dirname, '../'),
        compress: true,
        publicPath: `/${path.basename(__dirname)}/js/`,
        // historyApiFallback: true,
        proxy: [
            {
            context:[
                `/${path.basename(__dirname)}/js/**/*_v*.js`,
                `/${path.basename(__dirname)}/css/**/*_v*.`+'css'
            ],
            target: "http://localhost",
            changeOrigin: true,
            pathRewrite: function (path, req) {
                if(/\.js$/.test(path)) {
                    return path.replace(/(_v.*\.js)$/i, '.js');
                } else if(/\.css$/.test(path)) {
                    return path.replace(/(_v.*\.css)$/i, '.css');
                }
            }
        },{
            context:[
                '/exchange/**',
                '/common/**',
                '/user/**',
                '/accountmanage/**',
                '/dashboard/**',
                '/special/**',
                '/wos/**'
            ],
            target: "http://sl.g.58.com",
            changeOrigin: true,
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});