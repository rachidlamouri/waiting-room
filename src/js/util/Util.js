var remote = require('electron').remote
var dialog = remote.dialog
var os = require('os')

window.onerror = function(message, source, lineNum, colNum, error){
    let win = remote.getCurrentWindow()
    if(!win.isDevToolsOpened()){
        let output = error.message+os.EOL+error.stack
        dialog.showErrorBox('Error', output)
    }
    
    if(window.Util == undefined || Util.debug == undefined){
        win.webContents.openDevTools()
    }
}

var {exec} = require('child_process')
var fs = require('fs')
var path = require('path')

// Util
window.Util = {
    CHARS: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
    
    isUndefined(value, undefinedVal, definedVal){
        return value == undefined? undefinedVal: (arguments.length < 3? value: definedVal)
    },
    randomText(length = 20){
        let string = ''
        for(let i=0; i < length; i++){
            string += Util.CHARS.charAt(Math.floor(Math.random() * Util.CHARS.length))
        }
        return string
    },
    run(command, done = function(output){}){
        let output = ''
        exec(command, function(error, stdout, stderror){
            if(stdout){
                output += stdout
            }

            if(stderror){
                output += stderror
            }

            if(error){
                output += error
            }

            done(output)
        })
    },
}

// jQuery
window.$ = window.jQuery = require('jquery')

$.fn.extend({
    showFlex(){
        this.css('display', 'flex')
    },
})

// Custom Number Functions
$.extend(Number.prototype, {
    parseNum(){
        return this
    },
    toPercent(precision = 0){
        return (this*100).toFixed(precision)+'%'
    },
})

// Custom String Functions
$.extend(String.prototype, {
    minimize(){
        // remove excess whitespace
        return this.replace(/\s+/g, ' ')
    },
    parseNum(){
        return this == ''? 0: parseFloat(this.replace(/,/g, ''))
    },
    toAttr: function(value){
        value = Util.isUndefined(value, '', `="${value}"`)
        return `[${this}${value}]`
    },
    toBool(){
        return this.toLowerCase() == 'true'
    },
    toId(){
        return '#'+this
    },
    toClass(name){
        return '.'+this
    },
})

// Paths
Util.Paths = require(`${__dirname.split('src')[0]}${path.sep}src${path.sep}js${path.sep}util${path.sep}Paths`)
Util.paths = new Util.Paths()

// File
$.extend(Util, require(Util.paths.src('js/util/File')))

// ContextMenu
Util.ContextMenu = require(Util.paths.src('js/util/ContextMenu'))
Util.contextMenu = new Util.ContextMenu($(document))

// Debug
Util.Debug = require(Util.paths.src('js/util/Debug'))
Util.debug = new Util.Debug()

// TestSuite
Util.TestSuite = require(Util.paths.src('js/util/TestSuite'))
