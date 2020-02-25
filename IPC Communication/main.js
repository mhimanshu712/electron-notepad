// Modules
const {app, BrowserWindow, ipcMain} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800, x: 100, y:140,
    webPreferences: { nodeIntegration: true }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  //We can send message directly to a window object but we must wait till 
  //its web contents gets loaded.
  
  mainWindow.webContents.on( 'did-finish-load', e => {

    mainWindow.webContents.send( 'mailbox', {
      from: 'Ray',
      email: 'ray@stackacademy.tv',
      priority: 1
    })
  })

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

ipcMain.on( 'sync-message', (e, args) => {
  console.log(args)

  setTimeout( () => {
    e.returnValue = 'A sync response from the main process'
  }, 4000)

})

//It can also be ipcMain.once in that case it will stop listening after 
//receiving the first message.

ipcMain.on( 'channel1', (e, args) => {
  console.log(args)

  //send back the message to the sender
  e.sender.send( 'channel1-response', 'Message received on "channel1". Thank you!')
})

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
