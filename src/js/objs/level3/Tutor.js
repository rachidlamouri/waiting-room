var paths = Util.paths
var Conductor = require(paths.obj('level3/Conductor'))

class Tutor extends Conductor{
    constructor(insertId, conductor, skipTo){
        super(insertId, skipTo)
        
        $.extend(this, {
            conductor: conductor,
            boneTreats: [],
            poopTreats: [],
        })
        
        this.state.stage = 0
        
        for(let i=0; i < 8; i++){
            this.boneTreats.push('B')
        }
        this.poopTreats.push('P')
        this.poopTreats.push('p')
        
        this.resetCocoNotes(0)
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
                this.state.stage = 1
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
                this.state.stage = 2
            }
        }
    }
    resetCocoNotes(startTime){
        this.addNote('bbbbbbbb')
        this.addNote('bbbbbbbb')
        this.addNote('bbbbbbbb')
        this.addNote('bbbbbbbb')
        
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')
        
        this.addNote(`----b-${this.boneTreats[7]}-`, 7)
        this.addNote(`--b-${this.boneTreats[6]}---`, 6)
        this.addNote(`----${this.boneTreats[5]}-b-`, 5)
        this.addNote(`--${this.boneTreats[4]}-b---`, 4)
        
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')
        
        this.addNote(`---${this.boneTreats[3]}----`, 3)
        this.addNote(`-${this.boneTreats[2]}------`, 2)
        this.addNote(`---${this.boneTreats[1]}----`, 1)
        this.addNote(`-${this.boneTreats[0]}------`, 0)
        
        this.compose(startTime)
    }
    resetMillieNotes(startTime){
        this.addNote('bbbbbbbb')
        this.addNote('bbbbbbbb')
        this.addNote('bbbbbbbb')
        this.addNote('bbbbbbbb')
        
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')
        this.addNote(`${this.poopTreats[1]}-------`, 1)
        
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')
        
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')
        this.addNote(`-------${this.poopTreats[0]}`, 0)
        
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')
        
        this.compose(startTime)
    }
    resetRestNotes(startTime){
        this.nextTime = nextTime
        
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')
        this.addNote('--------')
        
        this.compose(startTime)
    }
    update(engine){
        super.update(engine)
        
        if(this.state.stage < 3 && this.notes.length == 0){
            if(this.state.stage == 0){
                this.resetCocoNotes(500)
            }else if(this.state.stage == 1){
                this.resetMillieNotes(500)   
            }else if(this.state.stage == 2){
                $('audio')[0].currentTime = 0
                engine.addObj(this.conductor)
                this.state.stage = 3
            }
        }
    }
}

module.exports = Tutor
