const chalk = require('chalk');
const Configstore = require('configstore');
const File = require('../files');
const build = require('./build');

module.exports = function init(type) {
  if (type === 'node-api') {
    if (File.packageExists('package.json')) {
      const packageName = File.getPackageName();
      const config = new Configstore(packageName, {
        type,
        workdir: File.getCurrentDirectoryBase()
      });

      build(packageName);
    } else {
      console.log(chalk.red('package.json file not found!'));
      process.exit();
    }
  }
}