const { toLowerCase } = require('./application')

function filterApps(source, searching) {
	if (source.includes(searching))
		return source;
}

function search(source, searching) {
	const getAllCoincidenceApps = source.filter(el => {
		return filterApps(el.keywords, searching)
	})

	return getAllCoincidenceApps
}

function findMatchedApp(apps, searching) {
	let match = null

	apps.filter(function (app) {
		if (app.keywords == searching) {
			return match = app
		}
	})

	return match
}

function orderApps(apps, searching) {
	const appsLocal = [...apps]

	return appsLocal.sort((a, b) => {
		var compareA = toLowerCase(a.keywords).indexOf(searching)
		var compareB = toLowerCase(b.keywords).indexOf(searching)

		if (compareA !== -1 && compareB !== -1) {
			return compareA - compareB
		}
	})
}

module.exports = {
	filterApps,
	search,
	orderApps,
	findMatchedApp
}