// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// Inter-Process Communication
// remote uses IPC communication to do the job.

// ipcmain: Server
// ipcRenderer: client

//Ipc is async by default so it dosen't wait for a response

//Ipc can also send sync, a sync message demands a response;


const { ipcRenderer } = require('electron')

let i = 1
setInterval( () => {
  console.log(i)
  i++
}, 1000)

document.getElementById('talk').addEventListener('click', e => {

  // ipcRenderer.send( 'channel1', 'Hello from main window')

  let response = ipcRenderer.sendSync( 'sync-message', 'Waiting for response')
  console.log(response)

})

ipcRenderer.on( 'channel1-response', (e, args) => {
  console.log(args)
})

ipcRenderer.on( 'mailbox', (e, args) => {
  console.log(args)
})
