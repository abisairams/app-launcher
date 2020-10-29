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
exports.filterApps = filterApps
exports.isEmptyArray = isEmptyArray
exports.toLowerCase = toLowerCase