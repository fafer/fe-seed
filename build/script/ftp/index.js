#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const conf = require('../../conf');
if (
  !fs.existsSync(conf.OUT_PATH) ||
  !fs.lstatSync(conf.OUT_PATH).isDirectory()
) {
  console.warn(`${conf.OUT_PATH} is not exit or not directory`);
  process.exit();
}
const server = require('./server.json')[1];
const Upload = require('./upload');
const uploaderInstance = new Upload(server);
uploaderInstance.put(
  conf.OUT_PATH,
  path.posix.join(server.path, conf.PUBLICBASE)
);
