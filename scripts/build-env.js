const execSync = require('child_process').execSync
const packageJSON = require('../package.json')

let sdkVersion = packageJSON.version

module.exports = {
	SDK_VERSION: sdkVersion,
}
