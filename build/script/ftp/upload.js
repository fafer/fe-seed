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
        client.put(filePath, destPath, err => {
          if (!err) console.log(`${destPath} 文件上传成功`);
          else console.log(`${destPath} 文件上传失败`);
          resolve();
        });
      });
    }
  }
}

function task(server, fn) {
  let clientInstance = new Client();
  clientInstance.on('error', err => {
    console.log(err);
  });
  clientInstance.on('ready', async () => {
    await fn.call(clientInstance);
    clientInstance.end();
    clientInstance = null;
  });
  clientInstance.connect(server);
}

class Upload {
  constructor(server) {
    this.server = server;
  }

  put(src, dest) {
    task(this.server, async function() {
      await upload(this, src, dest);
    });
  }
}

module.exports = Upload;
