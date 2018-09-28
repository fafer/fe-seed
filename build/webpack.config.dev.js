const conf = require('./conf');
const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
    mode:'development',
    devtool: 'inline-source-map',
    devServer: {
        host: '0.0.0.0',
        port: 80,
        disableHostCheck: true,
        allowedHosts:[],
        hot: true,
        contentBase: conf.ENTRY_PATH,
        compress: true,
        publicPath: conf.PUBLICBASE ? conf.PUBLICBASE + '/':'/',
        // historyApiFallback: true,
        proxy: [
            {
            context:[
                `/**/*_v*.js`,
                `/**/*_v*.`+'css'
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