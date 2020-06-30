const chalk = require('chalk')
const Configstore = require('configstore')
const File = require('../files')

module.exports = function init (type) {
  if (type === 'node') {
    if (File.packageExists('package.json')) {
      const packageName = File.getPackageName()
      const config = new Configstore(packageName, {
        name: packageName,
        type,
        workdir: File.getCurrentDirectoryBase()
      })
      return config
    } else {
      console.log(chalk.red('package.json file not found!'))
    }
  }
}
