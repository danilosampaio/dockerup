const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const argv = require('minimist')(process.argv.slice(2));
const inquirer = require('./lib/inquirer');
const init = require('./lib/scripts/init');
const run = require('./lib/scripts/run');
const build = require('./lib/scripts/build');
const File = require('./lib/files');

clear();

console.log(
  chalk.green(
    figlet.textSync('Dockerup', { horizontalLayout: 'full' })
  )
);

(async () => {
  if (argv._[0] === 'init') {
    const applicationTypes = ['node-api', 'react-native'];
    const answers = await inquirer.askApplicationType(applicationTypes);
    if (answers.type.length) {
      init(answers.type[0]);
    } else {
      console.log(chalk.red('Select a application type!'));
      process.exit();
    }
  } else if (argv._[0] === 'build') {
    const packageName = File.getPackageName();
    build(packageName);
  } else if (argv._[0] === 'run') {
    const packageName = File.getPackageName();
    run(packageName);
  }
})();
