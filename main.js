// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

// app.disableHardwareAcceleration()

let win

app.whenReady().then(() => {
  win = new BrowserWindow({
    webPreferences: {
      offscreen: true
    }
  })

  win.loadURL('http://github.com')
  win.webContents.on('paint', (event, dirty, image) => {
    console.log('drawing frame...')
    console.log(image.toDataURL())
  })
  win.webContents.setFrameRate(30)
})
