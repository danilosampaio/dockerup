const fs = require('fs')
const path = require('path')
const Configstore = require('configstore')

function File () {

}

File.getCurrentDirectoryBase = function getCurrentDirectoryBase () {
  return process.cwd()
}

File.packageExists = function packageExists (filePath) {
  return fs.existsSync(filePath)
}

File.getPackageName = function getPackageName () {
  return require(path.join(File.getCurrentDirectoryBase(), 'package.json')).name
}

File.getNpmPackage = function getNpmPackage () {
  return require(path.join(File.getCurrentDirectoryBase(), 'package.json'))
}

File.loadConfig = function loadConfig (packageName) {
  const config = new Configstore(packageName)
  const { type, workdir } = config.all

  if (type && workdir) {
    return config
  }
}

module.exports = File
