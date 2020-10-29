function runApp (cmd) {
	return new Promise(function (resolve, reject) {
		exec(`${cmd}`, function (error, stdout, stderr) {
			if (error) {
				resolve(error); // Extrange? yeah, but i dont want to use try-catch
				return
			}
			console.log(stderr);
			resolve();
		});
	})
}

exports.runApp = runApp