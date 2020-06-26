const { spawn } = require('child_process');
const Configstore = require('configstore');

module.exports = function run(packageName) {
  const config = new Configstore(packageName);
  const { type, workdir } = config.all;
  if (type === 'node') {
    const dockerRun = spawn(
      'docker',
      [`run --rm -it --name ${packageName} -p 3000:3000 -v ${workdir}:/home/node/app -e "NODE_ENV=dev" ${packageName}`],
      { shell: true, stdio: ['inherit', 'inherit', 'inherit'] }
    );
    /*dockerRun.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    
    dockerRun.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });*/
    
    dockerRun.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }
}