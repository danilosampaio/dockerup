const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const Configstore = require('configstore');
const File = require('./lib/files');
const inquirer = require('./lib/inquirer');

clear();

console.log(
  chalk.green(
    figlet.textSync('Dockerup', { horizontalLayout: 'full' })
  )
);

(async () => {
  const applicationTypes = ['node-api', 'react-native'];
  const answers = await inquirer.askApplicationType(applicationTypes);
  if (answers.type.length) {
    if (answers.type[0] === 'node-api') {
      if (File.packageExists('package.json')) {
        const packageName = File.getPackageName();
        const config = new Configstore(packageName, {
          type: answers.type[0],
          path: File.getCurrentDirectoryBase()
        });
        console.log(chalk.yellow(JSON.stringify(config.all)));
        process.exit();
      } else {
        console.log(chalk.red('package.json file not found!'));
        process.exit();
      }
    }
  } else {
    console.log(chalk.red('Select a application type!'));
    process.exit();
  }
})();
