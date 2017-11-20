var SrcFile = Util.SrcFile
var paths = Util.paths
var Engine = EngineUtil.Engine
var GameObj = EngineUtil.GameObj
var Input = EngineUtil.Input

let Scene = $.extend(class{
    constructor(canvasWidth, canvasHeight, playerInputsList){
        if(document.readyState !== 'complete'){
            throw new Scene.DocumentNotReadyException()
        }
        
        if(playerInputsList && playerInputsList.length > 0){
            playerInputsList[0].addInput('reloadScene', new Input(['r', 'R'], [Input.SELECT]))
            playerInputsList[0].addInput('pause', new Input(['Escape'], [Input.START]))
        }
        
        $.extend(this, {
            body: $('body'),
            canvasWidth: canvasWidth,
            canvasHeight: canvasHeight,
            playerInputsList: playerInputsList,
        })
    }
    
    load(objList){
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.canvasWidth
        this.canvas.height = this.canvasHeight
        this.body.append(this.canvas)
        
        this.body.append(Scene.PAUSE_HTML)
        let pauseMenu = $('.pause-menu')
        pauseMenu.find('.button').click((clickEvent)=>{
            let button = $(clickEvent.target)
            let action = button.attr('action')
            
            let scene
            if(action == 'main-menu'){
                let MainMenu = require(paths.scene('MainMenu'))
                scene = new MainMenu()
                
                this.unload()
                scene.load()
            }else if(action == 'retry'){
                this.reload()
            }else if(action == 'continue'){
                pauseMenu.hide()
                this.engine.resume()
            }
        })
        
        this.engine = new Engine(this, this.playerInputsList)
        
        let gameMaster = new GameObj(0, 0, 0, 0, {
            draw: false,
            simpleUpdate: function(engine){
                let inputs = engine.getPlayerInputStates(0)
                
                this.checkSimpleAction(inputs.pause, 'pause', ()=>{
                    if(engine.isRunning()){
                        engine.pause()
                    }else if(engine.isPaused()){
                        engine.resume()
                    }
                })
                
                this.checkSimpleAction(inputs.reloadScene, 'reloadScene', ()=>{
                    engine.scene.reload()
                })
            },
        })
        objList.push(gameMaster)
        $.each(objList, (index, obj)=>{
            this.engine.addObj(obj)
        })
        
        this.engine.start()
    }
    reload(){
        this.unload()
        let scene = new this.constructor()
        scene.load()
    }
    unload(){
        this.engine.stop()
        this.body.empty()
    }
},
/* Global Vars */{
    PAUSE_HTML: (new SrcFile('html/pause_menu.html')).read(),
    
    DocumentNotReadyException: function(){
        this.message = 'You can only create a scene if the document is ready'
    }
})
module.exports = Scene
