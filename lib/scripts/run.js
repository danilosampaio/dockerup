const { spawn } = require('child_process')
const Configstore = require('configstore')

module.exports = function run (config) {
  const { type, name, workdir } = config.all
  if (type === 'node') {
    const dockerRun = spawn(
      'docker',
      [`run --rm -it --name ${name} -p 3000:3000 -v ${workdir}:/home/node/app -e "NODE_ENV=dev" ${name}`],
      { shell: true, stdio: ['inherit', 'inherit', 'inherit'] }
    )

    dockerRun.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
}
