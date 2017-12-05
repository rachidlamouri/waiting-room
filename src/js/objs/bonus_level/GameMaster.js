const paths = Util.paths

const GameObj = EngineUtil.GameObj
const SU = EngineUtil.Scene.SU
const U = EngineUtil.Scene.U

const Wall = require(paths.obj('barriers/Wall'))
const Platform = require(paths.obj('platforms/Platform'))
const Elevator = require(paths.obj('platforms/Elevator'))
const ElevatorSensor = require(paths.obj('platforms/ElevatorSensor'))

const CocoTreat = require(paths.obj('triggers/CocoTreat'))
const BonusPoop = require(paths.obj('bonus_level/BonusPoop'))
const BonusBone = require(paths.obj('bonus_level/BonusBone'))

class GameMaster extends GameObj{
    constructor(){
        super(0, 0, 0, 0, {
            draw: false,
        })
        
        this.state.game = GameMaster.GAME_NONE
    }
    
    resetGames(){
        
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
            new BonusBone(7.6*U, 2.42*U),
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
            
            engine.addObj(obj)
        })
        
        let elevator = new Elevator(.5*U, -U, U, 8, U, 500)
        let elevatorSensor = new ElevatorSensor(elevator.pos.x, elevator)
        elevator.setSensor(elevatorSensor)
        elevator.tags = treatRaceTags
        elevatorSensor.tags = treatRaceTags
        
        engine.addObj(elevator)
        engine.addObj(elevatorSensor)
    }
    update(engine){
        if(this.state.game == GameMaster.GAME_NONE){
            let treatRaceSensors = engine.getObjsByTag('treat-race-sensor')
            
            if(treatRaceSensors[0].state.active && treatRaceSensors[1].state.active){
                this.state.game = GameMaster.GAME_TREAT_RACE
                this.setupTreatRace(engine)
                
                treatRaceSensors[0].deactivate()
                treatRaceSensors[1].deactivate()
            }
        }else if(this.state.game == GameMaster.GAME_TREAT_RACE){
            let bones = engine.getObjsByClass('BonusBone')
            let poops = engine.getObjsByClass('BonusPoop')
            
            if(bones.length == 0 || poops.length == 0){
                this.state.game = GameMaster.GAME_NONE
                
                if(bones.length == 0){
                    console.log('Coco Won!')
                }
                
                if(poops.length == 0){
                    console.log('Millie Won!')
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
        }
    }
}
$.extend(GameMaster, {
    GAME_NONE: 'none',
    GAME_TREAT_RACE: 'treat-race',
    GAME_SL_GL: 'sit-light-green-light',
})

module.exports = GameMaster
