const path = require('path');
const fs = require('fs');
const resolveExtensions = /\.(jsx?|tsx?)$/;

const getEntry = function(
  pathname,
  base = path.basename(pathname),
  entry = {}
) {
  let files = fs.readdirSync(pathname);

  let name = '';
  files.forEach(function(file) {
    if (fs.lstatSync(path.join(pathname, file)).isDirectory()) {
      getEntry(
        path.join(pathname, file),
        `${base}${ENTRY_SEPERATE}${file}`,
        entry
      );
    } else if (resolveExtensions.test(file)) {
      name = `${base}${ENTRY_SEPERATE}${file.replace(resolveExtensions, '')}`;
      entry[name] = path.join(pathname, file);
    }
  });
  return entry;
};

//entry文件分隔符 '/'会生成层级目录、连字符的话，eg：-，会将层级目录以文件名形式显示
const ENTRY_SEPERATE = '/';

// 项目源文件目录
const SRC_PATH = path.join(__dirname, '../src');

// 打包输出目录
const OUT_PATH = path.join(__dirname, '../dist');

// 打包入口目录
const ENTRY_PATH = path.join(__dirname, '../src/pages');

// copy目录
const COPY_PATH = path.join(__dirname, '../src/lib');

// copy目标目录
const COPY_DEST_PATH = path.join(OUT_PATH, 'lib');

const PUBLICBASE = '';
// 根目录base，默认未“/”
const BASEPATH = PUBLICBASE ? PUBLICBASE + '/' : '/';

const VENDOR = ['react', 'react-dom', '@babel/polyfill'];

// 配置CDN,HOST
const HOST = {
  js: 'j1.58cdn.com.cn',
  css: 'c.58cdn.com.cn',
  img: 'img.58cdn.com.cn'
};
const PUBLICPATH = HOST.js ? `//${HOST.js}${BASEPATH}` : BASEPATH;
const IMGPUBLICPATH = HOST.img ? `//${HOST.img}${BASEPATH}` : BASEPATH;
const CSSPUBLICPATH = HOST.css ? `//${HOST.css}${BASEPATH}` : BASEPATH;

module.exports = {
  SRC_PATH,
  OUT_PATH,
  ENTRY_PATH,
  COPY_PATH,
  COPY_DEST_PATH,
  getEntry() {
    return getEntry(ENTRY_PATH);
  },
  ENTRY_SEPERATE,
  HOST,
  PUBLICBASE,
  BASEPATH,
  PUBLICPATH,
  IMGPUBLICPATH,
  CSSPUBLICPATH,
  VENDOR
};
