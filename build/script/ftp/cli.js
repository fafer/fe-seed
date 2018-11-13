const meow = require('meow');
const table = require('text-table');
const servers = require('./server.json');
const chalk = require('chalk');
const inquirer = require('inquirer');
const cli = meow(
  `
	Usage
    $ npm run deploy -- <serverIndex>, ftp server index,default 0
    or
    $ npm link & deploy <serverIndex>

	Options
	  --all, -a

  Examples
    $ npm run deploy -- 0
    $ npm run deploy -- --all
  Help  
    $ npm run deploy -- --help
`,
  {
    description: false,
    flags: {
      all: {
        type: 'boolean',
        alias: 'a'
      }
    }
  }
);

function getIndex(index) {
  index = new Number(index);
  if (isNaN(index)) index = 0;
  else {
    index = Number.parseInt(index);
    if (index >= servers.length || index < 0) {
      index = 0;
    }
  }
  return index;
}

const options = {
  index: getIndex(cli.input[0]),
  all: cli.flags.all
};

if (cli.flags.help) {
  cli.showHelp(0);
  process.exit();
}

module.exports = async function() {
  if (options.all) {
    const choices = table(servers.map(d => Object.values(d))).split('\n');
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'host',
        message: 'FTP Server List',
        transformer:function() {
          return ''
        },
        choices: [new inquirer.Separator(' '),...choices.map((name,value) => {
          return {name,value,short:servers[value].host}
        }),new inquirer.Separator(' '),new inquirer.Separator(chalk.reset('↑ ↓ to select. Enter to start upload. Control-C to cancel.')),new inquirer.Separator(' ')]
      }
    ]);
    return servers[getIndex(answer.host)];
  }
  return servers[options.index];
};
