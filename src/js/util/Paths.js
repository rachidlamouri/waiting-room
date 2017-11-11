/* Saves the absolute path to major folders
    app:    folder with src and package.json
    data:   folder where data will be saved
    extra:  folder where external files are packaged
    res:    folder with app and extra
    src:    folder in app that stores source files
*/

var remote = require('electron').remote
var app = remote.app

var fs = require('fs')
var path = require('path')

var Paths = $.extend(class{
    constructor(){
        this.app = `${__dirname.split(Paths.SRC_NAME)[0]}`
        this.src = `${this.app}${Paths.SRC_NAME}${Paths.DELIMITER}`
        
        let appName = path.basename(this.app)
        this.asarExists = appName == Paths.ASAR_NAME
        
        let appPackage = JSON.parse(fs.readFileSync(this.appFile('package.json')))
        let dataName = this.asarExists? appPackage.name: appPackage.name+Paths.DATA_SUFFIX
        
        this.res = this.asarExists? this.app.split(appName)[0]: this.app
        this.data = this.asarExists? `${app.getPath('appData')}${Paths.DELIMITER}${dataName}${Paths.DELIMITER}`: `${this.appFile(dataName)}${Paths.DELIMITER}`
        this.extra = `${this.resFile(Paths.EXTRA_NAME)}${Paths.DELIMITER}`
        
        if(!fs.existsSync(this.extra)){
            fs.mkdirSync(this.extra)
        }
        
        if(!fs.existsSync(this.data)){
            fs.mkdirSync(this.data)
        }
    }
    
    appFile(filePath){
        return this.app+filePath
    }
    dataFile(filePath){
        return this.data+filePath
    }
    extraFile(filePath){
        return this.extra+filePath
    }
    getAsarExists(){
        return this.asarExists
    }
    resFile(filePath){
        return this.res+filePath
    }
    srcFile(filePath){
        return this.src+filePath
    }
},
/* Global */{
    APP_NAME: 'app',
    ASAR_NAME: 'app.asar',
    DATA_SUFFIX: '-Data',
    DELIMITER: path.sep,
    EXTRA_NAME: 'extra',
    SRC_NAME: 'src',
    RES_NAME: 'resources',
})
module.exports = Paths
