const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference to the window or else it gets garbage collected
let win

app.on('ready', function(){
    win = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#FFF',
    });

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