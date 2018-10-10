const conf = require('./conf');
const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const os = require('os');
const argv = require('yargs').argv;

let port;

if (argv.https) {
    if (os.platform() === 'darwin') port = 8042;
    else port = 443;
} else {
    if (os.platform() === 'darwin') port = 8041;
    else port = 80;
}

module.exports = Merge(CommonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: '0.0.0.0', //允许外网访问，默认值为localhost
        port: port,
        open: true, //服务启动后，打开浏览器默认访问：http://host:port/
        openPage: '', //设置默认打开的页面路径
        public: "localhost", //配置服务启动后，打开浏览器访问http://public,优先级最高>useLocalIp>默认
        useLocalIp: true, //配置服务启动后，打开浏览器访问:http://本地ip:port/,如果失败，转发到public设置
        https: argv.https ? true : false, //开启https
        disableHostCheck: true, //允许所有host域名访问
        allowedHosts: [], //设置允许访问的域名白名单
        hot: true, //开启热更新
        hotOnly: true, //编译失败后，再次编译成功，不需要刷新页面更新
        contentBase: [conf.ENTRY_PATH, path.join(conf.ROOT_PATH)], //配置访问静态资源根目录
        compress: true, //请求的资源启用gzip
        publicPath: conf.BASEPATH, //设置打包文件访问地址
        // historyApiFallback: true, //historyApi路由404后，转发到index.html
        stats: "errors-only", //控制编译过程控制台输出
        watchOptions: { //有些文件系统下，需要手动开启轮询监视文件变化
            poll: true
        },
        // setup(app) {},              //服务启动时执行中间件
        // before(app) {},              //拦截请求
        // after(app) {},            //请求输出时处理
        proxy: [ //配置转发请求代理
            {
                context: [
                    `/**/*_v*.js`,
                    `/**/*_v*.` + 'css'
                ],
                ssl: argv.https ? conf.ssl() : undefined,
                secure: !!argv.https,
                target: `${argv.https ? 'https':'http'}://127.0.0.1`,
                changeOrigin: true,
                pathRewrite: function (path, req) {
                    console.log(path)
                    if (/\.js$/.test(path)) {
                        return path.replace(/(_v.*\.js)$/i, '.js');
                    } else if (/\.css$/.test(path)) {
                        return path.replace(/(_v.*\.css)$/i, '.css');
                    }
                }
            }, {
                context: [
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
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});