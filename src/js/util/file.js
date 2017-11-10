var os = require('os')
var Paths = window.Paths

let File = $.extend(
    /* Constructor */ function(path){
        this.path = path
    },
    /* Global */{
        UTF_8: 'UTF-8',
        
        FileNotFoundException: function(path, showStackTrace = true){
            this.file = path
            if(showStackTrace){
                console.trace()
            }
        },
    },
    /* Instance */{prototype:{
        append(string, newLine = false){
            if(this.exists()){
                string = this.read() + string
            }
            
            this.write(string, newLine)
        },
        exists(){
            return fs.existsSync(this.path)
        },
        mkDir(){
            // Makes folder if it does not exist
            if(!this.exists()){
                fs.mkdirSync(this.path)
            }
        },
        mkFile(){
            if(!this.exists()){
                this.write('', 'o')
            }
        },
        prepend(string, newLine = false){
            if(this.exists()){
                string = string + this.read()
            }
            
            this.write(string, newLine)
        },
        read(showStackTrace = true){
            let output
            try{
                output = fs.readFileSync(this.path, File.UTF_8)
            }catch(exception){
                throw new File.FileNotFoundException(this.path, showStackTrace)
            }
            
            return output
        },
        readToArray(delimiter, pop = false){
            let output = this.read().split(delimiter)
            if(pop){
                output.pop()
            }
            
            return output
        },
        rm(){
            if(this.exists()){
                let stats = fs.statSync(this.path)
                if(stats.isDirectory()){
                    fs.rmdirSync(this.path)
                }else{
                    fs.unlinkSync(this.path)
                }
            }
        },
        write(string, newLine = false){
            if(newLine){
                string += os.EOL
            }
            
            fs.writeFileSync(this.path, string)
        },
    }}
)

let AppFile = function(path){
    $.extend(this, new File(Paths.appFile(path)))
}

let DataFile = function(path){
    $.extend(this, new File(Paths.dataFile(path)))
}

let ExtraFile = function(path){
    $.extend(this, new File(Paths.extraFile(path)))
}

let ResFile = function(path){
    $.extend(this, new File(Paths.resFile(path)))
}

let SrcFile = function(path){
    $.extend(this, new File(Paths.srcFile(path)))
}

module.exports.File = File
module.exports.AppFile = AppFile
module.exports.DataFile = DataFile
module.exports.ExtraFile = ResFile
module.exports.ResFile = ResFile
module.exports.SrcFile = SrcFile
