const path = require('path');
const fs = require('fs');
const resolveExtensions = /\.jsx?$/;

const getEntry = function (pathname,base,entry) {
  if(!base) base = path.basename(pathname)
  let files = fs.readdirSync(pathname),name = '';
  if(!entry) entry = {};
  files.forEach(function(file) {
      if(fs.lstatSync(path.join(pathname,file)).isDirectory()) {
          getEntry(path.join(pathname,file),`${base}/${file}`,entry);
      } else if(resolveExtensions.test(file)){
          name = `${base}/${file.replace(resolveExtensions,'')}`;
          entry[name] = path.join(pathname,file);
      }
  });
  return entry;
}

const ROOT_PATH = path.join(__dirname, '..');
const OUT_PATH = path.join(__dirname, '../dist');
const ENTRY_PATH = path.join(__dirname, '../src/pages');
const ENTRY = getEntry(ENTRY_PATH);
const HOST = {
    js:'j1.58cdn.com.cn',
    css:'c.58cdn.com.cn',
    img:'img.58cdn.com.cn'
}


module.exports = {
  ROOT_PATH,
  OUT_PATH,
  ENTRY_PATH,
  ENTRY,
  HOST
}