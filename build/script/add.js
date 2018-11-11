#!/usr/bin/env node
'use strict';

const conf = require('../conf');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const ora = require('ora');
const meow = require('meow');
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
      `${path.basename(conf.ENTRY_PATH)}/${name}/${path.basename(
        scriptTemplate,
        '.jsx'
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

const cli = meow(
  `
	Usage
	  $ npm run add <filename>, create file

	Options
	  --title, -t,page title

  Examples
   $ npm run add test
	  $ npm run add test --title=test
`,
  {
    flags: {
      title: {
        type: 'string',
        alias: 't'
      }
    }
  }
);

const options = {
  filename: cli.input[0],
  title: cli.flags.title
};

if (!options.filename) {
  ora('').fail(chalk.red('please input filename'));
  cli.showHelp();
} else add(options.filename, options.title);
