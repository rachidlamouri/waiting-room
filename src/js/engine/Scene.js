var paths = Util.paths
var Engine = EngineUtil.Engine

let Scene = $.extend(class{
    constructor(canvasWidth, canvasHeight, keyInputs, gamepadInputs){
        if(document.readyState !== 'complete'){
            throw new Scene.DocumentNotReadyException()
        }
        
        let canvas = document.createElement('canvas')
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        $('body').append(canvas)
        
        $.extend(this, {
            engine: new Engine(canvas, keyInputs, gamepadInputs)
        })
    }
    
    load(objList){
        $.each(objList, (index, obj)=>{
            this.engine.addObj(obj)
        })
        
        this.engine.start()
    }
},
/* Global Vars */{
    DocumentNotReadyException: function(){
        this.message = 'You can only create a scene if the document is ready'
    }
})
module.exports = Scene
