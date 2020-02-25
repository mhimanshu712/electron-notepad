// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const remote = require('electron').remote
const { app, dialog, BrowserWindow } = remote

const button = document.getElementById('test-button')
const nwin  = document.querySelector('#newin')

let secWin;

button.addEventListener('click', e => {

  // dialog.showMessageBox({ message: 'Dialog invoked from Renderer process' })

  
  //Access the node js global
  console.log( remote.getGlobal('myglob') )

  // app.quit()

  //getCurretWindow returns the window to which the page belongs
  let win = remote.getCurrentWindow()
  win.maximize()

})


nwin.addEventListener('click', e =>{
	secWin = new BrowserWindow({
    width: 400, height: 350
  })

	secWin.loadFile('index.html')
})

