function filterApps(appList, app) {
	if (appList.includes(app))
		return appList;
}

function isEmptyArray(param) {
	return param.length ? false : true;
}

function toLowerCase(string) {
	return string.toLowerCase()
}

function toUpperCaseFirstLetter(string) {
	if (string.length !== 1)
		return string
	return string.charAt(0).toUpperCase()
}

function findMatchedApp(apps, searching) {
	let match = null
	const posible = []

	apps.filter(function (app) {
		if (app.keywords == searching) {
			match = app
		} else {
			posible.push(app);
		}
	})

	return { match, posible }
}

exports.filterApps = filterApps
exports.isEmptyArray = isEmptyArray
exports.toLowerCase = toLowerCase
exports.toUpperCaseFirstLetter = toUpperCaseFirstLetter
exports.findMatchedApp = findMatchedApp