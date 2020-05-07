const electron = require('electron');
const { app, BrowserWindow, globalShortcut, Menu } = electron;
let win = undefined;

let template = [
  {
    label: 'Applicación',
    submenu: [{
      label: 'Maximizar',
      enabled: true,
      accelerator: 'CmdOrCtrl+M',
      click: function () {
        if (win.isMaximized()) {
          win.unmaximize();
        } else {
          win.maximize();
        }
      }
    }, {
      label: 'Minimizar',
      enabled: true,
      accelerator: 'CmdOrCtrl+N',
      role: 'minimize'
    }, {
      label: 'Salir',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    }]
  }, {
    label: 'Vista',
    submenu: [{
      label: 'Recargar',
      accelerator: 'CmdOrShift+F5',
      click: function (focusedWindow) {
        win.reload();
      }
    }, {
      label: 'Dev Tools',
      accelerator: 'CmdOrCtrl+I',
      click: function (item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.toggleDevTools()
        }
      }
    }]
  }]

function renderWindow() {
  const xx = electron.screen.getPrimaryDisplay().workAreaSize.width;
  let options = {
    title: 'Run App',
    y: 0,
    x: xx - (450 * 2),
    maximizable: false,
    minimizable: false,
    resizable: false,
    // alwaysOnTop: true,
    // kiosk: true,
    width: 450,
    height: 150,
    frame: false,
    backgroundColor: '#2f2f2f',
    webPreferences: {
      nodeIntegration: true
    }
  };
  win = new BrowserWindow(options);
  win.loadURL(`file://${__dirname}/src/index.html`);
  win.on('closed', function (e) {
    win = null;
    app.quit();
  })
};


app.on('ready', function (e) {

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  renderWindow();
  
  globalShortcut.register('CmdOrCtrl+q', () => {
    app.quit();
  })
  globalShortcut.register('Alt+p', () => {
    if (win.isVisible()) {
      if (win.isFocused()) {
        win.hide();
      } else {
        win.focus();
      }
    } else {
      win.show();
    }
  })
});
  
const singleInstance = app.requestSingleInstanceLock();

if (!singleInstance) {
  app.quit();
}