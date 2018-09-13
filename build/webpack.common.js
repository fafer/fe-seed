const path = require('path');
const conf = require('./conf');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: Object.assign(conf.ENTRY,{
        vendor:['react','react-dom']
    }),
    output: {
        filename: '[name].js',
        chunkFilename:'[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader",
                exclude:path.join(conf.ROOT_PATH,'node_modules')
            },
            {
                test:/\.jsx?$/,
                loader:'babel-loader',
                exclude:path.join(conf.ROOT_PATH,'node_modules'),
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: [
                        "@babel/plugin-transform-runtime"
                    ]
                }
            },
            {
                test:/\.scss$/,
                use: [
                    {
                        loader:MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },{
                 test: /\.(png|svg|jpg|jpeg|gif)$/,
                 use:[
                     'file-loader'
                 ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json','.jsx','.tsx','.css','.scss']
    },
    optimization:{
        splitChunks:{
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 10
                }
            }
        }
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css"
          })
    ]
}