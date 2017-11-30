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
    constructor(){
        super(0, 0)
        
        $.extend(this, {
            insertId: undefined,
            elapsedTime: 0,
            notes: [],
        })
        
        this.state.random = false
    }
    
    addNote(time, composition){
        this.notes.unshift(new Note(time, composition))
    }
    setInsertId(id){
        this.insertId = id
    }
    update(engine){
        this.elapsedTime += engine.timestep
        
        while(this.notes.length > 0 && this.elapsedTime >= this.notes[0].time){
            let note = this.notes.shift()
            note.create(engine, this.insertId)
        }
    }
}

class Note{
    constructor(composition, time=500){
        $.extend(this, {
            time: Note.TOTAL_TIME,
            composition: composition.split(''),
        })
        
        Note.TOTAL_TIME -= time
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
                    treat = new CocoCloudTreat(xPos, yPos, 'treat_coco')
                }
            }else if(letter.toLowerCase() == 'p'){
                xPos = index == 0? -U: SU.x + U
                yPos = letter == 'P'? 2*U: 4*U
                
                cloud = new PoopCloud(xPos, yPos)
                treat = new MillieCloudTreat(xPos, yPos, 'treat_millie')
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
    TOTAL_TIME: 33500,
})

module.exports = Conductor
