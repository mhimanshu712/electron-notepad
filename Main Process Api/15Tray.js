// Modules
const {app, BrowserWindow, Tray, Menu} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
//Do the same for tray
let mainWindow, tray

let trayMenu = Menu.buildFromTemplate([
  { label: 'Item 1' },
  { role: 'quit' }
])

function createTray() {

  //Only first line is required to create a tray entry
  tray = new Tray('trayTemplate@2x.png')

  //Tooltip on tray
  tray.setToolTip('Tray details')

  //On click toogle visibility of app
  tray.on('click', e => {

    //Clicking with shiftkey down closes the app
    if (e.shiftKey) {
      app.quit()
    } else {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    }
  })

  //Set context menu of tray icon
  //When context is woriking the click options above are ignored
  tray.setContextMenu(trayMenu)
}

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  createTray()

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: { nodeIntegration: true }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

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
