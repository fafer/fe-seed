const path = require('path');
const fs = require('fs');
const join = require('path').join;

function getEntry(pathname,base,entry) {
    if(!base) base = path.basename(pathname)
    let files = fs.readdirSync(pathname),name = '';
    if(!entry) entry = {};
    files.forEach(function(file) {
        if(fs.lstatSync(join(pathname,file)).isDirectory()) {
            getEntry(join(pathname,file),`${base}/${file}`,entry);
        } else {
            name = `${base}/${file.replace(/(.jsx)$/,'')}`;
            entry[name] = join(pathname,file);
        }
    });
    return entry;
}

module.exports = {
    entry: Object.assign(getEntry(join(__dirname,'/src/pages')),{
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
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: [
                        "@babel/plugin-transform-runtime"
                    ]
                }
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
        extensions: ['.ts', '.js', '.json','.jsx','.tsx','.css','.less']
    },
    optimization:{
        splitChunks:{
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    chunks: "initial"
                }
            }
        }
    },
    plugins:[]
}