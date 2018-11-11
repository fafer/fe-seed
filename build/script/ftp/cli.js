const meow = require('meow');
const table = require('text-table');
const servers = require('./server.json');
const chalk = require('chalk');
const getStdin = require('get-stdin');
const cli = meow(
  `
	Usage
	  $ npm run deploy <serverIndex>, ftp server index,default 0

	Options
	  --all, -a

  Examples
    $ npm run deploy 0
	  $ npm run deploy --all
`,
  {
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
  cli.showHelp();
  process.exit();
}

module.exports = async function() {
  if (options.all) {
    console.log(chalk.green(table(servers.map(d => Object.values(d)))));
    return servers[getIndex(await getStdin())];
  }
  return servers[options.index];
};
