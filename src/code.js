const electron = require('electron').remote
var { exec } = require('child_process')
const win = electron.getCurrentWindow()
const { myApps, installedApps } = require('../persistence/filesystem')
const { runApp } = require('./runner')
const { filterApps, findMatchedApp, search, orderApps } = require('./search')
const { isEmptyArray, toLowerCase, toUpperCaseFirstLetter } = require('./application')

let result


function showSuggestions(suggestion) {
	suggestionElem.style.display = 'block'
	suggestionElem.innerText = suggestion
}

function hideSuggestions() {
	suggestionElem.style.display = 'none'
	suggestionElem.innerText = ''
}

function handleSearching(source, searching) {
	let searchResult = search(source, searching)

	if (isEmptyArray(searchResult)) {
		searchResult = search(installedApps, searching)
	}

	const appsFounds = findMatchedApp(searchResult, searching)
	const orderedAppsFound = orderApps(appsFounds, searching)

	if (appsFounds.match) {
		return appsFounds.match
	}

	return appsFounds.posible[0]

}

function autocomplete(e) {
	const typing = toLowerCase(this.value);
	this.value = toUpperCaseFirstLetter(this.value)

	if (isEmptyArray(typing)) {
		resetState()
		return
	}

	result = handleSearching(myApps, typing)

	if (result) {
		showSuggestions(result.name)
		return
	}
	result = null;
	hideSuggestions()

}

function resetState() {
	result = null
	input.value = ''
	hideSuggestions()
}

function resetWindowState() {
	resetState()
	win.hide()
	hideSuggestions()
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
		resetWindowState()
	}
})

const form = document.getElementById('form');
const input = document.getElementById('cmd');
const suggestionElem = document.getElementById('suggestion');

input.addEventListener('keyup', autocomplete, false);
form.addEventListener('submit', handleSubmit, false);