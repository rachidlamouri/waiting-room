var remote = require('electron').remote
var dialog = remote.dialog
var os = require('os')

window.onerror = function(message, source, lineNum, colNum, error){
    let win = remote.getCurrentWindow()
    if(!win.isDevToolsOpened()){
        let output = error.message+os.EOL+error.stack
        dialog.showErrorBox('Error', output)
    }
}

var {exec} = require('child_process')
var fs = require('fs')
var path = require('path')
var DateFormat = require('dateformat')

// Util
window.Util = {
    FORMAT_COMMAS: ',',
    FORMAT_PERCENT: '%',
    
    format(value, format, details = {}){
        /* DateFormat
            y: year
            d: day
            m: month
            H: hour (24hr format)
            M: minute
            s: second
        */
        if(format == Util.FORMAT_PERCENT){
            let precision = Util.isUndefined(details.precision, 0)
            value = value.parseNum().toPercent(precision)
        }else if(format == Util.FORMAT_COMMAS){
            let precision = Util.isUndefined(details.precision, 0)
            value = value.parseNum().toLocaleString(undefined, {
                minimumFractionDigits: precision,
                maximumFractionDigits: precision,
            })
        }else{
            value = DateFormat(new Date(value), format)
        }
        
        return value
    },
    isUndefined(value, undefinedVal, definedVal){
        return value == undefined? undefinedVal: (arguments.length < 3? value: definedVal)
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
window.Paths = require(`${__dirname.split('src')[0]}${path.sep}src${path.sep}js${path.sep}util${path.sep}Paths`)
window.paths = new Paths()

// File
var {File, AppFile, DataFile, ExtraFile, ResFile, DataFile, SrcFile} = require(paths.src('js/util/File'))

// ContextMenu
window.ContextMenu = require(paths.src('js/util/ContextMenu'))
window.contextMenu = new ContextMenu($(document))

// Debug
window.Debug = require(paths.src('js/util/Debug'))
window.debug = new Debug()

// TestSuite
window.TestSuite = require(paths.src('js/util/TestSuite'))

// Game Engine
window.Vect = require(paths.eng('Vect'))
window.Box = require(paths.eng('Box'))
window.Input = require(paths.eng('Input'))
window.KeyInput = require(paths.eng('KeyInput'))
window.PlayerInputs = require(paths.eng('PlayerInputs'))
window.InputListener = require(paths.eng('InputListener'))
window.Engine = require(paths.eng('Engine'))
window.Scene = require(paths.eng('Scene'))
window.GameObj = require(paths.eng('GameObj'))
window.SpriteSheet = require(paths.eng('SpriteSheet'))
window.Sprite = require(paths.eng('Sprite'))
