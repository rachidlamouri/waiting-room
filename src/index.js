const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference to the window or else it gets garbage collected
let win

app.on('ready', function(){
    win = new BrowserWindow({
        backgroundColor: '#FFF',
        //frame: false,
        //fullscreen: true,
    })
    
    win.setMenu(null)

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'html/index.html'),
        protocol: 'file:',
        slashes: true
    }))
    
    win.on('closed', function(){
        win = null
        app.quit()
    })
});