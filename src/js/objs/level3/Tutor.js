var paths = Util.paths
var Conductor = require(paths.obj('level3/Conductor'))

class Tutor extends Conductor{
    constructor(insertId, song, scene){
        super(insertId, song, scene)
        
        $.extend(this, {
            boneTreats: [],
            poopTreats: [],
        })
        
        this.startTime = 2500
        this.songStarted = false
        
        this.state.cocoDone = false
        this.state.millieDone = false
        this.state.stage = 0
        
        for(let i=0; i < 4; i++){
            this.boneTreats.push('B')
        }
        this.poopTreats.push('P')
        this.poopTreats.push('p')
        this.poopTreats.push('P')
        this.poopTreats.push('p')
        
        this.resetNotes(250)
    }
    
    removeCocoTreat(treatId){
        if(treatId != undefined){
            this.boneTreats[treatId] = 'b'
            
            let treatCount = 0
            $.each(this.boneTreats, (index, treat)=>{
                if(treat == 'B'){
                    treatCount++
                }
            })
            
            if(treatCount == 0){
                this.state.cocoDone = true
            }
        }
    }
    removeMillieTreat(treatId){
        if(treatId != undefined){
            let newChar = this.poopTreats[treatId] == 'P'? 'I': 'i'
            this.poopTreats[treatId] = newChar
            
            let treatCount = 0
            $.each(this.poopTreats, (index, treat)=>{
                if(treat.toLowerCase() == 'p'){
                    treatCount++
                }
            })
            
            if(treatCount == 0){
                this.state.millieDone = true
            }
        }
    }
    resetNotes(startTime){
        this.addNote('--------')
        
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')

        this.addNote('bbbbbbbb')
        this.addNote('bbbbbbbb')
        this.addNote('--------')
        this.addNote(`${this.poopTreats[3]}-------`, 3)
        
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')
        this.addNote(`-------${this.poopTreats[2]}`, 2)
        
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')
        this.addNote(`${this.poopTreats[1]}-------`, 1)
        
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')
        this.addNote(`-------${this.poopTreats[0]}`, 0)

        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')

        this.addNote('bbbbbbbb')
        this.addNote('bbbbbbbb')
        this.addNote('bbbbbbbb')
        this.addNote('bbbbbbbb')
        
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')
        
        this.addNote(`------${this.boneTreats[3]}-`, 3)
        this.addNote(`-----${this.boneTreats[2]}--`, 2)
        this.addNote(`----${this.boneTreats[1]}---`, 1)
        this.addNote(`---${this.boneTreats[0]}----`, 0)
        
        this.addNote('bbbbbbbb')
        this.addNote('bbbbbbbb')
        this.addNote('bbbbbbbb')
        this.addNote('bbbbbbbb')
        
        this.compose(startTime)
    }
    update(engine){
        if(!(this.state.cocoDone && this.state.millieDone)){
            super.update(engine)
        }else{
            this.state.stage = 1
        }
        
        if(this.state.stage == 0 && this.notes.length == 0){
            this.resetNotes(500)
        }
        
        if(this.state.stage == 1){
            this.state.stage = 2
            
            let coco = engine.getObjsByClass('Coco')[0]
            let millie = engine.getObjsByClass('Millie')[0]
            coco.setControllerId(undefined)
            coco.vel.x = 0
            millie.state.canFling = false
            
            coco.slideTo(40*4, -80, 5000)
            millie.state.endLevel3 = true
        }
        
        if(!this.songStarted &&  this.elapsedTime >= this.startTime){
            this.songStarted = true
            
            this.scene.audio.src = paths.sound('tutor_asc')
            this.scene.audio.currentTime = 0
            this.scene.audio.play()
        }
    }
}

module.exports = Tutor
