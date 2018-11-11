const Client = require('ftp');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
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
          if (!err) ora('').succeed(chalk.green(`${destPath} 目录创建成功`));
          resolve();
        });
      });
      await upload(client, filePath, destPath);
    } else {
      await new Promise(resolve => {
        client.put(filePath, destPath, err => {
          if (!err) ora('').succeed(chalk.green(`${destPath} 文件上传成功`));
          else ora('').fail(chalk.green(`${destPath} 文件上传失败`));
          resolve();
        });
      });
    }
  }
}

function task(server, fn) {
  let clientInstance = new Client();
  clientInstance.on('error', err => {
    if (err.message === 'Timeout while connecting to server') {
      spinner.fail(
        chalk.red(`connect to ${server.host}:${server.port} failed`)
      );
    }
  });
  clientInstance.on('ready', async () => {
    spinner.succeed(
      chalk.green(`connect to ${server.host}:${server.port} succeed`)
    );
    await fn.call(clientInstance);
    clientInstance.end();
    clientInstance = null;
  });
  clientInstance.connect(server);
  const spinner = ora(
    chalk.green(`connecting to ${server.host}:${server.port} ...`)
  ).start();
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
