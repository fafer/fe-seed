/* eslint-disable */
const Client = require('ftp');
const fs = require('fs');
const path = require('path');
/**
 *
 * @param {Client} client：ftp客户端实例
 * @param {String} src：目录
 * @param {String} dest：ftp目录
 */

function upload(client, src, dest) {
  let files = fs.readdirSync(src);
  files.forEach(async function(file) {
    let filePath = path.join(src, file),
      destPath = path.join(dest, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      await new Promise((resolve, reject) => {
        client.mkdir(destPath, function(err) {
          if (err) reject(err);
          else resolve();
        });
      });
      upload(client, filePath, destPath);
    } else {
      client.put(filePath, destPath);
    }
  });
}


class Upload {
  constructor(server) {
    this.clientInstance = new Client();
    this.server = server;
  }

  put(src, dest) {
    this.clientInstance.on('ready', () => {
      upload(this.clientInstance, src, dest);
      this.clientInstance.end();
    });
    this.clientInstance.connect(this.server);
  }
}

module.exports = Upload;
