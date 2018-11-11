#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const conf = require('../../conf');
const chalk = require('chalk');
if (
  !fs.existsSync(conf.OUT_PATH) ||
  !fs.lstatSync(conf.OUT_PATH).isDirectory()
) {
  console.warn(chalk.yellow(`${conf.OUT_PATH} is not exit or not directory`));
  process.exit();
}
const cli = require('./cli');
cli().then(server => {
  const Upload = require('./upload');
  const uploaderInstance = new Upload(server);
  uploaderInstance.put(
    conf.OUT_PATH,
    path.posix.join(server.path, conf.PUBLICBASE)
  );
});
// const getStdin = require('get-stdin');
// getStdin().then(str => {
// 	console.log(str);
// 	//=> 'unicorns'
// });

// const spinner = ora('Loading unicorns').start();

// setTimeout(() => {
// 	spinner.color = 'yellow';
//   spinner.text = 'Loading rainbows';
//   spinner.succeed('success')
// }, 1000);
