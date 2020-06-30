const File = require('./files')

module.exports = function detectType () {
    const package = File.getNpmPackage()
    if (package.name) {
        return 'node'
    }
}
