// Saves the absolute path to major folders

var fs = require('fs')
var path = require('path')
var Util = window.Util

var Paths = $.extend(
    /* Folder notes
        app:    directory with src and package.json
        data:   directory where data will be saved
        extra:  directory where external files are packaged
        res:    directory with app and extra
        src:    directory in app that stores source files
    */
    /* Constructor */ function(){
        this.app = `${__dirname.split(Paths.SRC_NAME)[0]}`
        this.src = `${this.app}${Paths.SRC_NAME}${Paths.DELIMITER}`
        
        let appName = path.basename(this.app)
        let asarExists = appName == Paths.ASAR_NAME
        
        let appPackage = JSON.parse(Util.readFile(this.appFile('package.json')))
        let dataName = appPackage.dataFolderName
        
        this.res = asarExists? this.app.split(appName)[0]: this.app
        this.data = asarExists? `${this.res}..${Paths.DELIMITER}..${Paths.DELIMITER}${dataName}${Paths.DELIMITER}`: `${this.appFile(dataName)}${Paths.DELIMITER}`
        this.extra = asarExists? this.resFile(Paths.EXTRA_NAME): `${this.appFile(Paths.EXTRA_NAME)}${Paths.DELIMITER}`
        
        Util.mkDir(this.extra)
        Util.mkDir(this.data)
    },
    /* Global */{
        APP_NAME: 'app',
        ASAR_NAME: 'app.asar',
        DELIMITER: path.sep,
        EXTRA_NAME: 'extra',
        SRC_NAME: 'src',
        RES_NAME: 'resources',
    },
    /* Instance */{prototype:{
        appFile(filePath){
            return this.app+filePath
        },
        dataFile(filePath){
            return this.data+filePath
        },
        extraFile(filePath){
            return this.extra+filePath
        },
        resFile(filePath){
            return this.res+filePath
        },
        srcFile(filePath){
            return this.src+filePath
        },
    }}
)
module.exports = Paths
