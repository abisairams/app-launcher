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

exports.isEmptyArray = isEmptyArray
exports.toLowerCase = toLowerCase
exports.toUpperCaseFirstLetter = toUpperCaseFirstLetter