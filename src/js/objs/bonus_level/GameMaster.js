const paths = Util.paths

const GameObj = EngineUtil.GameObj
const SU = EngineUtil.Scene.SU
const U = EngineUtil.Scene.U

const LevelTitle = require(paths.obj('LevelTitle'))
const Wall = require(paths.obj('barriers/Wall'))
const Platform = require(paths.obj('platforms/Platform'))
const Elevator = require(paths.obj('platforms/Elevator'))
const ElevatorSensor = require(paths.obj('platforms/ElevatorSensor'))

const CocoTreat = require(paths.obj('triggers/CocoTreat'))
const BonusPoop = require(paths.obj('bonus_level/BonusPoop'))
const BonusBone = require(paths.obj('bonus_level/BonusBone'))

const CocoSweeper = require(paths.obj('bonus_level/CocoSweeper'))
const MillieSweeper = require(paths.obj('bonus_level/MillieSweeper'))

class GameMaster extends GameObj{
    constructor(barkSensors){
        super(0, 0, 0, 0, {
            draw: false,
        })
        
        $.extend(this, {
            barkSensors: barkSensors,
            countdownTime: 1000,
            elapsedTime: 0,
            resetTime: 30,
        })
        
        this.state.game = GameMaster.GAME_NONE
        this.state.stage = 'wait-for-game'
    }
    
    addSensors(engine){
        $.each(this.barkSensors, (index, sensor)=>{
            sensor.deactivate()
            sensor.state.removeBy.removing = false
            sensor.opacity = 1
            engine.insertObj(sensor, this.id)
        })
    }
    removeSweepers(engine){
        let sweepers = engine.getObjsByClass('Sweeper')
        $.each(sweepers, (index, sweeper)=>{
            sweeper.removeBy(false)
        })
    }
    sweep(engine){
        let cocoSweeper = new CocoSweeper(SU.x + 1.5*U, false)
        let millieSweeper = new MillieSweeper(SU.x + .5*U, false)
        
        engine.addObj(cocoSweeper)
        engine.addObj(millieSweeper)
        
        let title = this.state.game == GameMaster.GAME_TREAT_RACE? 'Treat Race': 'Sit Light/Green Light'
        let gameTitle = new LevelTitle(.5*SU.x, 40, title)
        engine.addObj(gameTitle)
    }
    setupSitLightGreenLight(){
        
    }
    setupTreatRace(engine){
        let treatRaceTags = ['treat-race']
        
        let objs = [
            new Wall(2.5*U, 5.37*U, 10, 10),
            new Wall(4*U, 5.25*U, 10, 20),
            new Wall(7*U, 5.12*U, 10, 30),
            new Wall(7*U + 10, 5.37*U, 10, 10),
            new BonusBone(7.75*U, 5.20*U),
            new BonusPoop(7.75*U, 5.37*U),
            new Platform(5*U, 5*U, 6*U, 5*U, undefined, 250, 20,10),
            new Wall(1.5*U, 3*U, U, .5*U),
            new Wall(7.5*U, 3*U, U, .5*U),
            new Wall(5*U, 2.62*U, 10, 10),
            new Platform(3*U, 3*U, 6*U, 3*U, undefined, 250, U, .5*U),
            new BonusBone(7.6*U, 2.5*U),
            new BonusPoop(7.6*U, 2.6*U),
            new Wall(2*U, 1.25*U, U, .25*U),
            new Wall(3.70*U, 1.25*U, 20, .25*U),
            new Wall(6*U, .5*U, 20, 2*U),
            new Wall(5.5*U, 1.62*U, 60, .25*U),
            new BonusBone(4.5*U, .80*U),
            new BonusPoop(4.5*U, .90*U),
        ]
        
        $.each(objs, (index, obj)=>{
            if(obj.instanceOf('Platform')){
                obj.move()
            }
            
            if(!obj.instanceOf('TreatTrigger')){
                obj.tags = treatRaceTags
            }
            
            obj.opacity = 0
            
            engine.addObj(obj)
            obj.fadeIn()
        })
        
        let elevator = new Elevator(.5*U, -U, U, 8, U, 500)
        let elevatorSensor = new ElevatorSensor(elevator.pos.x, elevator)
        elevator.setSensor(elevatorSensor)
        elevator.tags = treatRaceTags
        elevatorSensor.tags = treatRaceTags
        
        engine.insertObj(elevator, this.id)
        engine.insertObj(elevatorSensor, this.id)
    }
    update(engine){
        if(this.state.stage == 'wait-for-game'){
            let active = false
            $.each(this.barkSensors, (index, sensor)=>{
                if(sensor.state.active){
                    active = true
                    return false
                }
            })
            
            if(active){
                this.elapsedTime += engine.timestep
                
                if(this.elapsedTime >= this.resetTime){
                    this.elapsedTime = 0
                    
                    $.each(this.barkSensors, (index, sensor)=>{
                        sensor.deactivate()
                    })
                }
            }
            
            if(this.barkSensors[0].state.active && this.barkSensors[1].state.active){
                this.state.game = GameMaster.GAME_TREAT_RACE
            }else if(this.barkSensors[2].state.active && this.barkSensors[3].state.active){
                this.state.game = GameMaster.GAME_SL_GL
            }
            
            if(this.state.game != GameMaster.GAME_NONE){
                this.state.stage = 'wait-for-sweep'
                
                $.each(this.barkSensors, (index, sensor)=>{
                    sensor.removeBy(false)
                })
                
                let controlsMaps = engine.getObjsByClass('ControlsMap')
                $.each(controlsMaps, (index, controlsMap)=>{
                    controlsMap.removeBy(false)
                })
                
                this.sweep(engine)
            }
        }else if(this.state.stage == 'setup'){
            this.removeSweepers(engine)
            if(this.state.game == GameMaster.GAME_TREAT_RACE){
                this.setupTreatRace(engine)
            }
            this.state.stage = 'wait-for-go'
        }else if(this.state.stage == 'wait-for-go'){
            let sweepers = engine.getObjsByClass('Sweeper')
            if(sweepers[0].opacity < .3){
                this.state.stage = 'game'
                
                let go = new LevelTitle(.5*SU.x, .5*SU.y, 'Go!')
                go.opacity = 1
                engine.addObj(go)
            }
        }else if(this.state.stage == 'game' && this.state.game == GameMaster.GAME_TREAT_RACE){
            let bones = engine.getObjsByClass('BonusBone')
            let poops = engine.getObjsByClass('BonusPoop')
            
            if(bones.length == 0 || poops.length == 0){
                this.state.game = GameMaster.GAME_NONE
                this.state.stage = 'cleanup'
                
                if(bones.length == 0){
                    let cocoWins = new LevelTitle(.5*SU.x, .5*SU.y - 15, 'Coco Wins!')
                    cocoWins.opacity = 1
                    engine.addObj(cocoWins)
                }
                
                if(poops.length == 0){
                    let millieWins = new LevelTitle(.5*SU.x, .5*SU.y + 15, 'Millie Wins!')
                    millieWins.opacity = 1
                    engine.addObj(millieWins)
                }
                
                $.each(bones, (index, bone)=>{
                    engine.removeObjById(bone.id)
                })
                
                $.each(poops, (index, poop)=>{
                    engine.removeObjById(poop.id)
                })
                
                let objs = engine.getObjsByTag('treat-race')
                $.each(objs, (index, obj)=>{
                    obj.removeBy(false)
                })
            }
        }else if(this.state.stage == 'wait-for-sweep'){
            let sweepers = engine.getObjsByClass('Sweeper')
            let stopped = true
            $.each(sweepers, (index, sweeper)=>{
                if(sweeper.vel.x != 0){
                    stopped = false
                }
            })
            
            if(stopped){
                this.elapsedTime = 0
                this.state.stage = 'countdown'
            }
        }else if(this.state.stage == 'countdown'){
            this.elapsedTime += engine.timestep
            if(this.elapsedTime >= this.countdownTime){
                this.elapsedTime = 0
                this.state.stage = 'setup'
            }
        }else if(this.state.stage == 'cleanup'){
            let objs = engine.getObjsByTag('treat-race')
            if(objs.length == 0){
                this.addSensors(engine)
                this.state.stage = 'wait-for-game'
            }
        }
    }
}
$.extend(GameMaster, {
    GAME_NONE: 'none',
    GAME_TREAT_RACE: 'treat-race',
    GAME_SL_GL: 'sit-light-green-light',
})

module.exports = GameMaster
