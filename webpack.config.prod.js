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
        publicPath: '//gj.58cdn.com.cn/global/js/',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),
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