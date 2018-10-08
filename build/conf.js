const path = require('path');
const fs = require('fs');
const resolveExtensions = /\.(jsx?|tsx?)$/;

const getEntry = function (pathname,base = path.basename(pathname),entry = {}) {
  let files = fs.readdirSync(pathname),name = '';
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

//项目根目录
const ROOT_PATH = path.join(__dirname, '..');

//打包输出目录
const OUT_PATH = path.join(__dirname, '../dist');

//打包入口目录
const ENTRY_PATH = path.join(__dirname, '../src/pages');

//copy目录
const COPY_PATH = path.join(__dirname,'../src/lib');

//copy目标目录
const COPY_DEST_PATH = path.join(OUT_PATH,'lib');

//解析entry
const ENTRY = getEntry(ENTRY_PATH);

const PUBLICBASE = '';
//根目录base，默认未“/”
const BASEPATH = PUBLICBASE ? PUBLICBASE + '/' : '/';

//配置CDN,HOST
const HOST = {
    js:'j1.58cdn.com.cn',
    css:'c.58cdn.com.cn',
    img:'img.58cdn.com.cn'
};
const PUBLICPATH = HOST.js?`//${HOST.js}${BASEPATH}`:BASEPATH;
const IMGPUBLICPATH = HOST.img?`//${HOST.img}${BASEPATH}`:BASEPATH;
const CSSPUBLICPATH = HOST.css?`//${HOST.css}${BASEPATH}`:BASEPATH;

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
  IMGPUBLICPATH,
  CSSPUBLICPATH
}