function isEmptyArray(param) {
	return param.length ? false : true;
}

function toLowerCase(string) {
	return string.toLowerCase()
}

function toUpperCaseFirstLetter(string) {
	if (string.length == 1)
		return string.toUpperCase()

	const firstLetter = string.charAt(0).toUpperCase()
	const remainingLetters = string.slice(1)
	return firstLetter.concat(remainingLetters)}

exports.isEmptyArray = isEmptyArray
exports.toLowerCase = toLowerCase
exports.toUpperCaseFirstLetter = toUpperCaseFirstLetter