const Client = require('ftp');
const fs = require('fs');
const path = require('path');
/**
 *
 * @param {Client} client：ftp客户端实例
 * @param {String} src：目录
 * @param {String} dest：ftp目录
 */

async function upload(client, src, dest) {
  let files = fs.readdirSync(src);
  for (let index = 0; index < files.length; index++) {
    let file = files[index];
    let filePath = path.join(src, file),
      destPath = path.posix.join(dest, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      await new Promise(resolve => {
        client.mkdir(destPath, function(err) {
          if (!err) console.log(`${destPath} 目录创建成功`);
          resolve();
        });
      });
      await upload(client, filePath, destPath);
    } else {
      await new Promise(resolve => {
        console.log('put', filePath, destPath);
        client.put(filePath, destPath, err => {
          if (!err) console.log(`${destPath} 文件上传成功`);
          else console.log(`${destPath} 文件上传失败`);
          resolve();
        });
      });
    }
  }
}

class Upload {
  constructor(server) {
    this.clientInstance = new Client();
    this.server = server;
  }

  put(src, dest) {
    this.clientInstance.on('ready', async () => {
      await upload(this.clientInstance, src, dest);
      this.clientInstance.end();
    });
    this.clientInstance.connect(this.server);
  }
}

module.exports = Upload;
