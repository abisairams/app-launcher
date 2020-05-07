const electron = require('electron').remote;
var { exec } = require('child_process')
const fs = require('fs');
const win = electron.getCurrentWindow();

const myApps = JSON.parse(fs.readFileSync(`${__dirname}/db.json`, 'utf8'));
var installedApps = fs.readdirSync('/usr/bin', 'utf8')

var result;

function filterApps(appList, app) {
	if (appList.includes(app))
		return appList;
}

function isEmptyArray(param) {
	// length > 0 means its not empty so its false
	return param.length ? false : true;
}

function autocomplete(e) {
	const typing = this.value.toLowerCase();
	if (this.value.length == 1) {
		input.value = this.value.charAt(0).toUpperCase();
	}

	if (!isEmptyArray(this.value)) {
		suggestion.style.display = 'block';

		// look for searching app in custom DB, if not match with any register
		// look for in installed app directory;

		const res = myApps.filter(el => filterApps(el.keywords, typing));

		if (!isEmptyArray(res)) {

			// we set into @var result variable the first result cuz the response
			// we use out this scope 
			result = res[0];
			suggestion.innerText = result.name;

		} else {

			const res = installedApps.filter(el => filterApps(el, typing));

			if (!isEmptyArray(res)) {
				var unique = {
					match: null,
					posible: []
				};
				res.filter(function (app) {
					if (app == typing) {
						unique.match = app
					} else {
						unique.posible.push(app);
					}
				})
				/*
				You could be wondering why u doing something stupid like store in an object
				the real match and posible results, if u can directly handle response for 
				render it on screen.
				Well it is right but i want to show first the result real matched,
				and directly i can not do this, cause the filter continue iterating for next
				elements in array so finally if result real matched is not the last element,
				what u think will happend?
				*/
				if (unique.match) {
					suggestion.innerText = unique.match;
				} else {
					unique.posible.filter(function (app) {
						// Remember to store in @var result for handle this result out this scope
						// the last element wich is like the searching app
						result = app;
						suggestion.innerText = app;
					})
				}

			} else {
				result = null;
				suggestion.innerText = '';
				suggestion.style.display = 'none';
			}
		}
	} else {
		result = undefined;
		suggestion.innerText = '';
		suggestion.style.display = 'none';
	}

}

function runApp (cmd) {
	exec(`${cmd}`, function (error, stdout, stderr) {
		if (error) throw error;
		console.log(stderr);
	});
}

function execCmd(e) {
	e.preventDefault();

	if (result && result.cmd) {

		runApp(result.cmd)

	} else {

		if (!isEmptyArray(input.value)) 
			runApp(input.value.toLowerCase());
	}

	setTimeout( () => {
		result = null;
		input.value = '';
		win.hide();
		suggestion.style.display = 'none';

	}, 50);

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
const suggestion = document.getElementById('suggestion');

input.addEventListener('keyup', autocomplete, false);
form.addEventListener('submit', execCmd, false);