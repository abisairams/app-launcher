const functions = require('./application');
const { myApps, installedApps } = require('../persistence/filesystem')

test('should return false', () => {
  expect(functions.isEmptyArray(myApps)).toBe(false)
})

test('should return false', () => {
  expect(functions.isEmptyArray(installedApps)).toBe(false)
})

test('should convert to toLowerCase its param', () => {
  expect(functions.toLowerCase('Hola')).toBe('hola')
})

test('should convert to toUpperCase first letter of its param', () => {
  expect(functions.toUpperCaseFirstLetter('hola')).toBe('Hola')
})
