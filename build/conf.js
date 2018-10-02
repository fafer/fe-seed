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
const COPY_PATH = path.join(__dirname,'../src/lib');
const COPY_DEST_PATH = path.join(OUT_PATH,'lib');
const ENTRY = getEntry(ENTRY_PATH);
const PUBLICBASE = '';
const BASEPATH = PUBLICBASE ? PUBLICBASE + '/' : '/';
const HOST = {
    js:'j1.58cdn.com.cn',
    css:'c.58cdn.com.cn',
    img:'img.58cdn.com.cn'
};
const PUBLICPATH = HOST.js?`//${HOST.js}${BASEPATH}`:BASEPATH;
const IMGPUBLICPATH = HOST.img?`//${HOST.img}${BASEPATH}`:BASEPATH;

module.exports = {
  ROOT_PATH,
  OUT_PATH,
  ENTRY_PATH,
  COPY_PATH,
  COPY_DEST_PATH,
  ENTRY,
  HOST,
  PUBLICBASE,
  BASEPATH,
  PUBLICPATH,
  IMGPUBLICPATH
}