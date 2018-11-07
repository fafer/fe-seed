'use strict';

/* eslint no-console: off */
const conf = require('../conf');
const path = require('path');
const fs = require('fs');
const process = require('process');
let templateDir = path.join(__dirname, '../template');

let htmlTemplate = 'index.html';

let scriptTemplate = 'index.jsx';

let htmlTemplatePath = path.join(templateDir, htmlTemplate);

let scriptTemplatePath = path.join(templateDir, scriptTemplate);

let htmlStr;
let scriptStr;

function add(name, title = '') {
  let addPath = path.join(conf.ENTRY_PATH, name);

  let htmlTemp;
  let scriptTemp;
  if (fs.existsSync(addPath)) {
    console.warn(`${conf.ENTRY_PATH} directory has ${name}`);
    return;
  } else {
    fs.mkdirSync(addPath);
  }
  if (!htmlStr) htmlStr = fs.readFileSync(htmlTemplatePath).toString();
  htmlTemp = htmlStr
    .replace(/\$\{base\}/gi, conf.PUBLICBASE)
    .replace(
      /\$\{name\}/gi,
      `${path.basename(conf.ENTRY_PATH)}/${name}/${scriptTemplate.replace(
        /\.jsx?$/,
        ''
      )}`
    )
    .replace(/\$\{title\}/gi, title);
  fs.writeFile(path.join(addPath, htmlTemplate), htmlTemp, err => {
    if (err)
      console.error(`write ${path.join(addPath, htmlTemplate)} failed`, err);
  });
  if (!scriptStr) scriptStr = fs.readFileSync(scriptTemplatePath).toString();
  scriptTemp = scriptStr.replace(
    /Name/gi,
    name.charAt(0).toUpperCase() + name.substring(1)
  );
  fs.writeFile(path.join(addPath, scriptTemplate), scriptTemp, err => {
    if (err)
      console.error(`write ${path.join(addPath, scriptTemplate)} failed`, err);
  });
}

const name = process.argv[2] || '';

const title = process.argv[3] || '';
if (!name) console.error('please input filename');
else add(name, title);
