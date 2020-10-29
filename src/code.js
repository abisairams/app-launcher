const electron = require('electron').remote
var { exec } = require('child_process')
const win = electron.getCurrentWindow()
const { myApps, installedApps } = require('../persistence/filesystem')
const { runApp } = require('./runner')
const { 
	filterApps, 
	isEmptyArray, 
	toLowerCase,
	listAppsMatched
 } = require('./application')

let result

function toUpperCaseFirstLetter(string) {
	if (string.length !== 1)
		return string
	return string.charAt(0).toUpperCase()
}

function showSuggestions(suggestion) {
	suggestionElem.style.display = 'block'
	suggestionElem.innerText = suggestion
}

function hideSuggestions() {
	suggestionElem.style.display = 'none'
	suggestionElem.innerText = ''
}

function findMatchedApp(apps, searching) {
	let match = null
	const posible = []

	apps.filter(function (app) {
		if (app == searching) {
			match = app
		} else {
			posible.push(app);
		}
	})

	return { match, posible }
}

function autocomplete(e) {
	const typing = toLowerCase(this.value);
	this.value = toUpperCaseFirstLetter(this.value)

	if (!isEmptyArray(this.value)) {

		// look for searching app in custom DB, if not match with any register
		// look for in installed app directory;
		result = {}
		let res = myApps.filter(el => filterApps(el.keywords, typing));
		
		if (!isEmptyArray(res)) {

			// we set into @var result variable the first result cuz the response
			// we will use out this scope 
			result = res[0];
			showSuggestions(result.name)
			return 
		}
		
		res = installedApps.filter(el => filterApps(el, typing));

		if (!isEmptyArray(res)) {
			const searching = findMatchedApp(res, typing)
			if (searching.match) {
				result.name = searching.match
				showSuggestions(result.name)
			} else {
				searching.posible.filter(function (app) {
					// Remember to store in @var result for handle this result out this scope
					// the last element wich is like the searching app
					result.name = app;
					showSuggestions(result.name)
				})
			}
			return
		}

		result = null;
		hideSuggestions()
	} else {
		result = null;
		hideSuggestions()
	}

}

function resetWindowState() {
	result = null
	input.value = ''
	win.hide()
	suggestion.style.display = 'none'
}

function execCmd(command) {

	if (result && result.cmd)
		return runApp(result.cmd);

	if (!isEmptyArray(command))
		return runApp(command);

}

function handleSubmit(e) {
	e.preventDefault()
	const command = toLowerCase(input.value)

	execCmd(command)
	resetWindowState()
}

win.addListener('focus', () => {
	input.focus();
})

document.addEventListener('keyup', (e) => {
	if (e.key == 'Escape') {
		win.hide();
	}
})

const form = document.getElementById('form');
const input = document.getElementById('cmd');
const suggestionElem = document.getElementById('suggestion');

input.addEventListener('keyup', autocomplete, false);
form.addEventListener('submit', handleSubmit, false);