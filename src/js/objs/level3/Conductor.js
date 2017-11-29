var paths = Util.paths
var GameObj = EngineUtil.GameObj
var Scene = EngineUtil.Scene

var Cloud = require(paths.obj('triggers/Cloud'))
var FallingTreat = require(paths.obj('level3/FallingTreat'))

class Conductor extends GameObj{
    constructor(){
        super(0, 0)
        
        $.extend(this, {
            elapsedTime: 0,
            interval: 1000,
            notes: [],
        })
        
        this.state.random = false
    }
    
    addNote(time, composition){
        this.notes.unshift(new Note(time, composition))
    }
    emitRandom(engine){
        let SU = Scene.SU
        let U = Scene.U
        
        let cloud = new Cloud(0, 0)
        let availableWidth = SU.x - cloud.dim.width
        cloud.pos.x = cloud.dim.width/2 + Util.randomNum(availableWidth)
        engine.addObj(cloud)
        
        let makeTreat = Util.randomNum(2) == 0
        if(makeTreat){
            let treat = new FallingTreat(0, -2)
            treat.pos.x = cloud.pos.x
            engine.addObj(treat)
        }
    }
    update(engine){
        this.elapsedTime += engine.timestep
        if(this.state.random && this.elapsedTime > this.interval){
            this.emitRandom(engine)
            this.elapsedTime = 0
        }
        
        while(this.notes.length > 0 && this.elapsedTime >= this.notes[0].time){
            let note = this.notes.shift()
            note.create(engine)
        }
    }
}

class Note{
    constructor(composition, time){
        $.extend(this, {
            time: time,
            composition: composition.split(''),
        })
    }
    
    create(engine){
        let U = Scene.U
        
        $.each(this.composition, (index, letter)=>{
            let obj
            let xPos = (index + 1)*U - .5*U
            let yPos = -U
            if(letter == 'B'){
                obj = new Cloud(xPos, yPos)
            }else if(letter  == '-'){
                return
            }
            
            engine.addObj(obj)
        })
    }
}

module.exports = Conductor
