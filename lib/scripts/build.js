import { exec } from 'child_process'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import CLI from 'clui'

export function build (config, callback) {
  const { type, name } = config.all
  if (type === 'node') {
    const countdown = new CLI.Spinner('Building docker image...  ', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'])
    const __dirname = dirname(fileURLToPath(import.meta.url))
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
