const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const Uglifyjs = require('uglifyjs-webpack-plugin');

module.exports = Merge(CommonConfig,{
    mode:'production',
    output: {
        publicPath: '//j1.58cdn.com.cn/js/',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV':JSON.stringify('production')
            }
        }),
        new Uglifyjs({
            sourceMap:false,
            extractComments:false,
            uglifyOptions:{
                output:{
                    comments: false
                },
                warnings: false
            }
        }),
        new ManifestPlugin()
    ]

});