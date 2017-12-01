var paths = Util.paths
var GameObj = EngineUtil.GameObj
var Scene = EngineUtil.Scene
var U = Scene.U
var SU = Scene.SU

var Cloud = require(paths.obj('triggers/Cloud'))

var ParallaxCloud = require(paths.obj('level3/ParallaxCloud'))
var BoneCloud = require(paths.obj('level3/BoneCloud'))
var PoopCloud = require(paths.obj('level3/PoopCloud'))
var CocoCloudTreat = require(paths.obj('level3/CocoCloudTreat'))
var MillieCloudTreat = require(paths.obj('level3/MillieCloudTreat'))

class Conductor extends GameObj{
    constructor(insertId, skipTo = 0){
        super(0, 0)
        
        $.extend(this, {
            insertId: insertId,
            elapsedTime: 0,
            nextTime: 0,
            notes: [],
            skipTo: skipTo,
        })
        
        this.state.random = false
        this.state.stage = 0
    }
    
    addNote(composition, treatId){
        this.notes.unshift(new Note(composition, treatId))
    }
    compose(startTime = 0){
        this.nextTime = startTime
        
        $.each(this.notes, (index, note)=>{
            if(this.nextTime < this.skipTo){
                note.skip = true
            }
            
            note.time = this.nextTime
            this.nextTime += 500
        })
        
        this.elapsedTime = this.skipTo
    }
    setInsertId(id){
        this.insertId = id
    }
    update(engine){
        this.elapsedTime += engine.timestep
        
        while(this.notes.length > 0 && (this.elapsedTime >= this.notes[0].time || this.notes[0].skip)){
            let note = this.notes.shift()
            if(!note.skip){
                note.create(engine, this.insertId)
            }
        }
    }
}

class Note{
    constructor(composition, treatId){
        $.extend(this, {
            composition: composition.split(''),
            time: undefined,
            skip: false,
            treatId,
        })
    }
    
    create(engine, insertId){
        let yPos = -U
        
        if(Note.MAKE_PARALLAX){
            let parallaxCloud = new ParallaxCloud(0, yPos)
            parallaxCloud.pos.x = parallaxCloud.dim.width/2 + Util.randomNum(SU.x - parallaxCloud.dim.width)
            parallaxCloud.terminalVel.y = .06
            engine.insertObj(parallaxCloud, insertId)
        }
        
        Note.MAKE_PARALLAX = !Note.MAKE_PARALLAX
        
        $.each(this.composition, (index, letter)=>{
            let cloud
            let treat
            let xPos
            if(letter  == '-'){
                return
            }else if(letter.toLowerCase() == 'b'){
                xPos = (index + 1)*U - .5*U
                cloud = new BoneCloud(xPos, yPos)
                
                if(letter == 'B'){
                    treat = new CocoCloudTreat(xPos, yPos, this.treatId)
                }
            }else if(letter.toLowerCase() == 'p' || letter.toLowerCase() == 'i'){
                xPos = index == 0? -U: SU.x + U
                yPos = (letter == 'P' || letter == 'I')? 2*U: 4*U
                
                cloud = new PoopCloud(xPos, yPos)
                if(letter.toLowerCase() == 'p'){
                    treat = new MillieCloudTreat(xPos, yPos, this.treatId)
                }
            }
            
            engine.insertObj(cloud, insertId)
            if(treat != undefined){
                cloud.setTreat(treat)
                treat.setCloud(cloud)
                
                engine.insertObj(treat, insertId)
            }
        })
    }
}
$.extend(Note, {
    MAKE_PARALLAX: false,
})

module.exports = Conductor
