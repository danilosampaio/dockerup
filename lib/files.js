import fs from 'fs'
import path from 'path'
import Configstore from 'configstore'

export function getCurrentDirectoryBase () {
  return process.cwd()
}

export function packageExists (filePath) {
  return fs.existsSync(filePath)
}

export function getPackageName () {
  return JSON.parse(fs.readFileSync(path.join(getCurrentDirectoryBase(), 'package.json'))).name
}

export function getNpmPackage () {
  return JSON.parse(fs.readFileSync(path.join(getCurrentDirectoryBase(), 'package.json')))
}

export function loadConfig (packageName) {
  const config = new Configstore(packageName)
  const { type, workdir } = config.all

  if (type && workdir) {
    return config
  }
}
