const { OUT_PATH, PUBLICBASE } = require('./build/conf');
const path = require('path');
module.exports = [
  {
    host: '10.252.185.206',
    port: 21,
    user: 'static',
    password: 'fe@fafer',
    srcPath: OUT_PATH,
    destPath: path.posix.join('/test', PUBLICBASE)
  },
  {
    host: '10.252.185.206',
    port: 21,
    user: 'static',
    password: 'fe@fafer',
    srcPath: OUT_PATH,
    destPath: path.posix.join('/test', PUBLICBASE)
  }
];
