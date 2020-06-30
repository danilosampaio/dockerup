const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const argv = require('minimist')(process.argv.slice(2))
const inquirer = require('./lib/inquirer')
const init = require('./lib/scripts/init')
const run = require('./lib/scripts/run')
const build = require('./lib/scripts/build')
const File = require('./lib/files')
const detectType = require('./lib/applications')

clear()

console.log(
  chalk.green(
    figlet.textSync('Dockerup', { horizontalLayout: 'full' })
  )
);

(async () => {
  const type = detectType();
  if (type === 'node') {
    const packageName = File.getPackageName()
    let config = File.loadConfig()
    
    if (!config) {
      config = init(type)
    }

    if (config.get('build') && argv._[0] !== 'build') {
      run(config)
    } else {
      build(config, (error) => {
        if (error) {
          console.log(error)
        } else {
          config.set({build: true})
          run(config)
        }
      })
    }
  } else {
    console.log(chalk.red('Application type not supported.'))
  }
})()
