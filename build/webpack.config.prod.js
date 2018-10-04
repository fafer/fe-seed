const path = require('path');
const conf = require('./conf');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const Uglifyjs = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = Merge(CommonConfig,{
    mode:'production',
    output: {
        publicPath: conf.PUBLICPATH,
        path: conf.OUT_PATH
    },
    optimization: {
        minimizer:[
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
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins:[
        new CleanWebpackPlugin([path.basename(conf.OUT_PATH)],{
            root: path.dirname(conf.OUT_PATH)
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV':JSON.stringify('production')
            }
        }),
        new ManifestPlugin({
            basePath:conf.BASEPATH,
            generate(seed, files) {
                return files.reduce((manifest, {name, path}) => {
                    if(/\.js$/.test(path)) {
                        return {...manifest, [name]: path}
                    } else if(/\.css$/.test(path)) {
                        return {...manifest, [name]: path.replace(conf.PUBLICPATH,conf.CSSPUBLICPATH)}
                    } 
                    return {...manifest, [conf.BASEPATH + path.replace(conf.PUBLICPATH,'')]: path.replace(conf.PUBLICPATH,conf.IMGPUBLICPATH)}
                }, seed)
            }
        })
    ]
});