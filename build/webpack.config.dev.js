const conf = require('./conf');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
    mode:'development',
    output: {
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    devServer: {
        host: '0.0.0.0',
        port: 8041,
        disableHostCheck: true,
        allowedHosts: [
            '.58.com',
            '.58cdn.com.cn'
        ],
        hot: true,
        contentBase: conf.ROOT_PATH,
        compress: true,
        publicPath: '/',
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