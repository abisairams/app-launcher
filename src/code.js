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

function handleSearching(searching) {
	let searchResult = search(myApps, searching)

	if (isEmptyArray(searchResult)) {
		searchResult = search(installedApps, searching)
	}

	const appFound = findMatchedApp(searchResult, searching)

	if (appFound) return appFound

	const orderedPosibleAppsFound = orderApps(searchResult, searching)
	return orderedPosibleAppsFound[0]

}

function autocomplete(typing) {
	result = handleSearching(typing)

	if (result) {
		showSuggestions(result.name)
		return
	}
	resetState()
}

function resetState() {
	result = null
	hideSuggestions()
}

function resetWindowState() {
	resetState()
	input.value = ''
	win.hide()
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

function handleInputSearch(e) {
	const typing = toLowerCase(this.value);
	this.value = toUpperCaseFirstLetter(this.value)

	if (isEmptyArray(typing)) {
		resetState()
		return
	}

	autocomplete(typing)
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

input.addEventListener('keyup', handleInputSearch, false);
form.addEventListener('submit', handleSubmit, false);