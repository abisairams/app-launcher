function filterApps(appList, app) {
	if (appList.includes(app))
		return appList;
}

function search(source, searching) {
	const getAllCoincidenceApps = source.filter(el => {
		return filterApps(el.keywords, searching)
	})

	return getAllCoincidenceApps
}

function orderApps(apps, searching) {
	const appsLocal = {...apps}

	return appsLocal.posible.sort((a, b) => {
		var compareA = toLowerCase(a.keywords).indexOf(searching)
		var compareB = toLowerCase(b.keywords).indexOf(searching)

		return compareA > compareB

	})
}

function findMatchedApp(apps, searching) {
	let match = null
	const posible = []

	apps.filter(function (app) {
		if (app.keywords == searching) {
			match = app
		} else {
			posible.push(app)
		}
	})

	return { match, posible }
}

module.exports = {
	filterApps,
	search,
	orderApps,
	findMatchedApp
}