let Scene = $.extend(class{
    constructor(inputList){
        if(document.readyState !== 'complete'){
            throw new Scene.DocumentNotReadyException()
        }
        
        $.extend(this, {
            engine: new Engine($('canvas')[0], inputList)
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
