var remote = require('electron').remote

var SrcFile = Util.SrcFile
var paths = Util.paths
var Engine = EngineUtil.Engine
var Vect = EngineUtil.Vect
var GameObj = EngineUtil.GameObj
var Input = EngineUtil.Input

class Scene{
    constructor(ctxWidth, ctxHeight, screenLeft, screenTop, playerInputsList){
        if(document.readyState !== 'complete'){
            throw new Scene.DocumentNotReadyException()
        }
        
        if(playerInputsList && playerInputsList.length > 0){
            playerInputsList[0].addInput('reloadScene', new Input(['r', 'R'], [Input.SELECT]))
            playerInputsList[0].addInput('pause', new Input(['Escape'], [Input.START]))
        }
        
        $.extend(this, {
            body: $('body'),
            ctxWidth: ctxWidth,
            ctxHeight: ctxHeight,
            screen: new Screen(screenLeft, screenTop, Scene.CANVAS_WIDTH, Scene.CANVAS_HEIGHT, ctxWidth - Scene.CANVAS_WIDTH, ctxHeight - Scene.CANVAS_HEIGHT),
            playerInputsList: playerInputsList,
        })
    }
    
    load(objList, scrollX = 0, scrollY = 0){
        this.canvas = document.createElement('canvas')
        this.canvas.width = Scene.CANVAS_WIDTH//this.ctxWidth//Scene.CANVAS_WIDTH
        this.canvas.height = Scene.CANVAS_HEIGHT//this.ctxHeight//Scene.CANVAS_HEIGHT
        this.body.append(this.canvas)
        window.scrollTo(scrollX, scrollY)
        
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
                    remote.getCurrentWindow().reload()
                    //engine.scene.reload()
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
}
$.extend(Scene, {
    CANVAS_WIDTH: 320,
    CANVAS_HEIGHT: 240,
    
    PAUSE_HTML: (new SrcFile('html/pause_menu.html')).read(),
    
    // Unit square
    U: 40,
    
    // Screen unit
    SU: new Vect(320, 240),
    
    DocumentNotReadyException: function(){
        this.message = 'You can only create a scene if the document is ready'
    }
})

class Screen{
    constructor(left, top, width, height, maxLeft, maxTop){
        $.extend(this, {
            corner: new Vect(left, top),
            dim: new Vect(width, height),
            maxLeft: maxLeft,
            maxTop: maxTop,
        })
    }
    
    getMid(){
        return new Vect(this.corner.x + this.dim.width/2, this.corner.y + this.dim.height/2)
    }
    setCorner(left, top){
        if(left < 0){
            left = 0
        }
        
        if(left > this.maxLeft){
            left = this.maxLeft
        }
        
        if(top < 0){
            top = 0
        }
        
        if(top > this.maxTop){
            top = this.maxTop
        }
        
        this.corner = new Vect(left, top)
    }
}
module.exports = Scene
