import chalk from 'chalk'
import clear from 'clear'
import figlet from 'figlet'
import minimist from 'minimist'
import { init } from './lib/scripts/init.js'
import { run } from './lib/scripts/run.js'
import { build } from './lib/scripts/build.js'
import { loadConfig } from './lib/files.js'
import { detectType } from './lib/applications.js'

const argv = minimist(process.argv.slice(2))

clear()

console.log(
  chalk.green(
    figlet.textSync('Dockerup', { horizontalLayout: 'full' })
  )
);

(async () => {
  const type = detectType()
  if (type === 'node') {
    let config = loadConfig()

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
          config.set({ build: true })
          run(config)
        }
      })
    }
  } else {
    console.log(chalk.red('Application type not supported.'))
  }
})()
