var os = require('os')
var Paths = window.Paths

let File = $.extend(class{
    constructor(path){
        this.path = path
    }
    append(string, newLine = false){
        if(this.exists()){
            string = this.read() + string
        }
        
        this.write(string, newLine)
    }
    exists(){
        return fs.existsSync(this.path)
    }
    mkDir(){
        // Makes folder if it does not exist
        if(!this.exists()){
            fs.mkdirSync(this.path)
        }
    }
    mkFile(){
        if(!this.exists()){
            this.write('', 'o')
        }
    }
    prepend(string, newLine = false){
        if(this.exists()){
            string = string + this.read()
        }
        
        this.write(string, newLine)
    }
    read(showStackTrace = true){
        let output
        try{
            output = fs.readFileSync(this.path, File.UTF_8)
        }catch(exception){
            throw new File.FileNotFoundException(this.path, showStackTrace)
        }
        
        return output
    }
    readToArray(delimiter, pop = false){
        let output = this.read().split(delimiter)
        if(pop){
            output.pop()
        }
        
        return output
    }
    rm(){
        if(this.exists()){
            let stats = fs.statSync(this.path)
            if(stats.isDirectory()){
                fs.rmdirSync(this.path)
            }else{
                fs.unlinkSync(this.path)
            }
        }
    }
    write(string, newLine = false){
        if(newLine){
            string += os.EOL
        }
        
        fs.writeFileSync(this.path, string)
    }
},
/* Global */{
    UTF_8: 'UTF-8',
    
    FileNotFoundException: function(path, showStackTrace = true){
        this.file = path
        if(showStackTrace){
            console.trace()
        }
    },
})

class AppFile extends File{
    constructor(path){
        super(Paths.appFile(path))
    }
}

class DataFile extends File{
    constructor(path){
        super(Paths.dataFile(path))
    }
}

class ExtraFile extends File{
    constructor(path){
        super(Paths.extraFile(path))
    }
}

class ResFile extends File{
    constructor(path){
        super(Paths.resFile(path))
    }
}

class SrcFile extends File{
    constructor(path){
        super(Paths.srcFile(path))
    }
}

module.exports.File = File
module.exports.AppFile = AppFile
module.exports.DataFile = DataFile
module.exports.ExtraFile = ResFile
module.exports.ResFile = ResFile
module.exports.SrcFile = SrcFile
