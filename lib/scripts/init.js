import chalk from 'chalk'
import Configstore from 'configstore'
import { packageExists, getPackageName, getCurrentDirectoryBase } from '../files.js'

export function init (type) {
  if (type === 'node') {
    if (packageExists('package.json')) {
      const packageName = getPackageName()
      const config = new Configstore(packageName, {
        name: packageName,
        type,
        workdir: getCurrentDirectoryBase()
      })
      return config
    } else {
      console.log(chalk.red('package.json file not found!'))
    }
  }
}
