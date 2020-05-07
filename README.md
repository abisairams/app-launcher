AppLauncher
========================


AppLauncher or RunApp is an simple application created with **Javascript**  using **Electron** & **Nodejs** obviously for easy launching any application installed on machine, and launch some apps that are not included in  your system PATH.

You can add your custom path in `db.json`, setting the **app name**, some **keywords**, for list app on screen and **cmd** or command wich is the full path to executable app.

**db.json** file content

```
[
	{
		"name": "App Name",
		"keywords": "app name description",
		"cmd": 'full/path/to/exec'
	},
	{
		"name": "Another App",
		"keywords": "another app name description",
		"cmd": 'full/path/to/app'
	}
]

```
Init your app and then you can use the `Alt+P` shortcut to toggle window.
You can add AppLAuncher to **Startup Application** so **SO** will exec on start for you this app.

This app was developed by [Abisai Ramos](https://www.facebook.com/07anonymus)