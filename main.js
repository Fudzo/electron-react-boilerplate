const { app, BrowserWindow } = require('electron');
const path = require('path'); 

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1024,
    height: 800,
    webPreferences: {
        nodeIntegration: false,
        worldSafeExecuteJavaScript: true,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
    }
  });
  win.loadFile('index.html');
};

if(!app.isPackaged) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});