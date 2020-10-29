const fs = require('fs')

const databasePath = fs.readFileSync(`${__dirname}/db.json`, 'utf8')
const myApps = JSON.parse(databasePath)
const installedApps = fs.readdirSync('/usr/bin', 'utf8')

exports.myApps = myApps
exports.installedApps = installedApps