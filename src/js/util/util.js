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

var exec = remote.exec
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
    isUndefined(value, arg1, arg2){
        /* Usage:
            isUndefined(value, valIfUndefined)
            isUndefined(value, valIfDefined, valIfUndefined)
        */
        let definedVal = arguments.length < 3? value: arg1
        let undefinedVal = arguments.length < 3? arg1: arg2
        
        return value == undefined? undefinedVal: definedVal
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
        value = Util.isUndefined(value, `="${value}"`, '')
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
window.Paths = new (require(`${__dirname.split('src')[0]}${path.sep}src${path.sep}js${path.sep}util${path.sep}Paths`))()

// File
var {File, AppFile, DataFile, ExtraFile, ResFile, DataFile, SrcFile} = require(Paths.srcFile('js/util/File'))

// ContextMenu
window.ContextMenu = require(Paths.srcFile('js/util/ContextMenu'))
window.DefaultMenu = new ContextMenu($(document))

// Debug
window.Debug = new (require(Paths.srcFile('js/util/Debug')))()

// TestSuite
window.TestSuite = require(Paths.srcFile('js/util/TestSuite'))