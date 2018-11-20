const { OUT_PATH, PUBLICBASE } = require('./build/conf');
const path = require('path');
module.exports = [
  {
    host: '192.168.185.128',
    port: 21,
    user: 'qatest',
    password: '58ftp@fe',
    srcPath: OUT_PATH,
    destPath: path.posix.join('/static.58.com/weitech/test', PUBLICBASE)
  },
  {
    host: '192.168.178.15',
    port: 21,
    user: 'qatest',
    password: '58ftp@fe',
    srcPath: OUT_PATH,
    destPath: path.posix.join('/static.58.com/weitech/test', PUBLICBASE)
  }
];
