/**
 * @author linhx <https://github.com/linhx>
 */
const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const idle = require('./idlechecker');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 400,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.setMenuBarVisibility(false);

  win.loadFile('index.html');

  ipcMain.on('start', (e, idleTime) => {
    idle.stop();
    idle.start(win, idleTime);
  })

  ipcMain.on('stop', (e) => {
    idle.stop();
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
