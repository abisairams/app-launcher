const fs = require('fs')

const databasePath = fs.readFileSync(`${__dirname}/db.json`, 'utf8')
const myApps = JSON.parse(databasePath)
const installedApps = fs.readdirSync('/usr/bin', 'utf8')

function parseInstalledApps() {
	return installedApps.map(app => {
		return {
			name: app,
			keywords: app,
			cmd: app
		}
	})
}

exports.myApps = myApps
exports.installedApps = parseInstalledApps()