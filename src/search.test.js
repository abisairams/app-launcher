const functions = require('./search')

const placeHolder = [
	{name: 'abisai', keywords: 'aspeak ramos', cmd: '123'},
	{name: 'ramos', keywords: 'speak tooww', cmd: '321'},
	{name: 'steve', keywords: 'apple ceo', cmd: '213'}
]

test('should output be the same input if array contains the second argument', () => {
	expect(functions.filterApps([1,2,3], 1)).toEqual([1,2,3])
	expect(functions.filterApps([1,2,3],6)).toEqual()
})

test('should return an array with all array elements passed that matched with searching value', () => {
  	expect(functions.search(placeHolder, 'ramos')).toEqual([placeHolder[0]])
})

test('should sort (a-z) the array passed as argument using indexOf(searching) as sorting criteria', () => {
	const unorderList = placeHolder
	const orderedList = [
		placeHolder[1],
		placeHolder[0],
		placeHolder[2]
	]

	expect(functions.orderApps(unorderList, 'speak')).toEqual(orderedList)
})

test('should return an object with an extrict result (match property)', () => {
	expect(functions.findMatchedApp(placeHolder, 'apple ceo')).toEqual(placeHolder[2])
})