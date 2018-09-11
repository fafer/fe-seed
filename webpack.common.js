const path = require('path');
const fs = require('fs');
const join = require('path').join;

function getEntry(pathname,base,entry) {
    var files = fs.readdirSync(pathname),name = '';
    if(!entry) entry = {};
    files.forEach(function(file) {
        if(fs.lstatSync(join(pathname,file)).isDirectory()) {
            getEntry(join(pathname,file),`${base}/${file}`,entry);
        } else {
            name = `${base}/${file.replace(/(.js)$/,'')}`;
            entry[name] = join(pathname,file);
        }
    });
    return entry;
}

module.exports = {
    entry: Object.assign(getEntry(join(__dirname,'/src/js/pkg/wechat'),'pkg/wechat'),{
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
                exclude:path.join(__dirname,'node_modules')
            },
            {
                test:/\.jsx?$/,
                loader:'babel-loader',
                exclude:path.join(__dirname,'node_modules'),
                options: {
                    presets: ['env','stage-2','stage-3']
                }
            },
            {
                test:/\.art?$/,
                loader:'art-template-loader'
            },
            {
                test:/\.html?$/,
                loader:'html-loader'
            },
            {
                test:/\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
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
        extensions: ['.ts', '.js', '.json','.jsx','.tsx','.html','.css','.less']
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
    ]
}