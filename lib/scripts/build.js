const { exec } = require('child_process')
const path = require('path')
const Configstore = require('configstore')
const CLI = require('clui')

module.exports = function build (config, callback) {
  const { type, name } = config.all
  if (type === 'node') {
    const countdown = new CLI.Spinner('Building docker image...  ', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'])
    const dockerupRoot = path.join(path.resolve(__dirname), '../../image-types/node')
    countdown.start()
    exec(`docker build -t ${name} ${dockerupRoot}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        callback(error)
      }
      countdown.stop()
      callback()
    })
  }
}
