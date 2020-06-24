const fs = require('fs');
const path = require('path');

function File () {

}

File.getCurrentDirectoryBase = function getCurrentDirectoryBase () {
  return process.cwd();
}

File.packageExists = function packageExists (filePath) {
  return fs.existsSync(filePath);
}

File.getPackageName = function getPackageName() {
  return require(path.join(File.getCurrentDirectoryBase(), 'package.json')).name;
}

module.exports = File;