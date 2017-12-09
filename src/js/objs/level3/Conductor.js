var paths = Util.paths
var GameObj = EngineUtil.GameObj
var Scene = EngineUtil.Scene
var U = Scene.U
var SU = Scene.SU

var Cloud = require(paths.obj('triggers/Cloud'))

var BoneCloud = require(paths.obj('level3/BoneCloud'))
var PoopCloud = require(paths.obj('level3/PoopCloud'))
var CocoCloudTreat = require(paths.obj('level3/CocoCloudTreat'))
var MillieCloudTreat = require(paths.obj('level3/MillieCloudTreat'))

class Conductor extends GameObj{
    constructor(insertId, song, scene, skip = 0){
        super(0, 0)
        
        $.extend(this, {
            insertId: insertId,
            elapsedTime: 0,
            nextTime: 0,
            notes: [],
            scene: scene,
            skip: skip,
            song: song,
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
            }
        }
        
        let startIndex = undefined
        $.each(this.notes, (index, note)=>{
            if(index == playIndex){
                note.playSong = true
            }
            
            if(skipCount > 0){
                note.skip = true
                skipCount--
            }else{
                if(skipCount == 0){
                    skipCount--
                    startIndex = index
                }
                note.time = this.nextTime
                this.nextTime += 500
            }
        })
        
        this.elapsedTime = startTime
        return (startIndex - 8)*500/1000
    }
    setInsertId(id){
        this.insertId = id
    }
    update(engine){
        this.elapsedTime += engine.timestep
        
        while(this.notes.length > 0 && (this.elapsedTime >= this.notes[0].time || this.notes[0].skip)){
            let note = this.notes.shift()
            if(!note.skip){
                note.create(engine, this.insertId, this.scene, this.song)
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
    
    create(engine, insertId, scene, song){
        if(this.playSong){
            scene.audio.currentTime = 0
            scene.audio.src = paths.sound(song)
            scene.audio.play()
        }

        $.each(this.composition, (index, letter)=>{
            let cloud
            let treat
            if(letter  == '-'){
                return
            }else if(letter.toLowerCase() == 'b'){
                let xPos = (index + 1)*U - .5*U
                let yPos = -U
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

module.exports = Conductor
