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
        this.folders = {}
        this.folders.app = `${__dirname.split(Paths.SRC_NAME)[0]}`
        this.folders.src = `${this.folders.app}${Paths.SRC_NAME}${Paths.DELIMITER}`
        
        let appName = path.basename(this.folders.app)
        this.asarExists = appName == Paths.ASAR_NAME
        
        let appPackage = JSON.parse(fs.readFileSync(this.app('package.json')))
        let dataName = this.asarExists? appPackage.productName: Paths.DEFAULT_DATA_NAME
        
        this.folders.res = this.asarExists? this.folders.app.split(appName)[0]: this.folders.app
        this.folders.data = this.asarExists? `${app.getPath('appData')}${Paths.DELIMITER}${dataName}${Paths.DELIMITER}`: `${this.app(dataName)}${Paths.DELIMITER}`
        this.folders.extra = `${this.res(Paths.EXTRA_NAME)}${Paths.DELIMITER}`
        
        if(!fs.existsSync(this.folders.extra)){
            fs.mkdirSync(this.folders.extra)
        }
        
        if(!fs.existsSync(this.folders.data)){
            fs.mkdirSync(this.folders.data)
        }
    }
    
    app(relativePath = ''){
        return this.folders.app+relativePath
    }
    asset(relativePath = ''){
        return this.src('img/assets/')+relativePath
    }
    data(relativePath = ''){
        return this.folders.data+relativePath
    }
    eng(relativePath = ''){
        return this.src('js/engine/')+relativePath
    }
    extra(relativePath = ''){
        return this.folders.extra+relativePath
    }
    getAsarExists(){
        return this.asarExists
    }
    scene(relativePath = ''){
        return this.src('js/scenes/')+relativePath
    }
    obj(relativePath = ''){
        return this.src('js/objs/')+relativePath
    }
    res(relativePath = ''){
        return this.folders.res+relativePath
    }
    src(relativePath = ''){
        return this.folders.src+relativePath
    }
},
/* Global */{
    APP_NAME: 'app',
    ASAR_NAME: 'app.asar',
    DEFAULT_DATA_NAME: 'data',
    DELIMITER: path.sep,
    EXTRA_NAME: 'extra',
    SRC_NAME: 'src',
    RES_NAME: 'resources',
})
module.exports = Paths
