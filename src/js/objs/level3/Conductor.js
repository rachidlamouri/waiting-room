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
    constructor(insertId, skip = 0){
        super(0, 0)
        
        $.extend(this, {
            insertId: insertId,
            elapsedTime: 0,
            nextTime: 0,
            notes: [],
            skip: skip,
        })
        
        this.state.random = false
        this.state.stage = 0
    }
    
    addNote(composition, treatId, playSong = false){
        this.notes.unshift(new Note(composition, treatId, playSong))
    }
    compose(startTime = 0){
        this.nextTime = startTime
        
        let skipCount = this.skip
        let firstLine = undefined
        let playIndex = undefined
        
        for(let i=0; i < this.notes.length; i++){
            let note = this.notes[i]
            
            if(note.isFirst){
                firstLine  = skipCount + i
                playIndex = firstLine + 4
                skipCount += i
            }
        }
        
        $.each(this.notes, (index, note)=>{
            if(index == playIndex){
                note.playSong = true
            }
            
            if(skipCount > 0){
                note.skip = true
                skipCount--
            }else{
                note.time = this.nextTime
                this.nextTime += 500
            }
        })
        
        this.elapsedTime = startTime
        return (playIndex - 8)*500/1000
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
    constructor(composition, treatId, isFirst = false){
        $.extend(this, {
            composition: composition.split(''),
            time: undefined,
            isFirst: isFirst,
            playSong: false,
            skip: false,
            treatId,
        })
    }
    
    create(engine, insertId){
        if(this.playSong){
            $('audio')[0].src = paths.sound('level3_theme')
            $('audio')[0].play()
        }
        
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
            if(letter  == '-'){
                return
            }else if(letter.toLowerCase() == 'b'){
                let xPos = (index + 1)*U - .5*U
                cloud = new BoneCloud(xPos, yPos)
                
                if(letter == 'B'){
                    treat = new CocoCloudTreat(xPos, yPos, this.treatId)
                }
            }else if(letter.toLowerCase() == 'p' || letter.toLowerCase() == 'i'){
                let xPos = index < 4 ? -U: SU.x + U
                let yPos = (letter == 'P' || letter == 'I')? 2*U: 4*U
                
                cloud = new PoopCloud(xPos, yPos)
                if(letter.toLowerCase() == 'p'){
                    treat = new MillieCloudTreat(xPos, yPos, this.treatId)
                }
            }else{
                return
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
