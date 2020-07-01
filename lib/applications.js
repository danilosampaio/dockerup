import { getNpmPackage } from './files.js'

export function detectType () {
  const packageInfo = getNpmPackage()
  if (packageInfo.name) {
    return 'node'
  }
}
