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
            audio: $('<audio></audio>')[0],
            body: $('body'),
            ctxWidth: ctxWidth,
            ctxHeight: ctxHeight,
            screen: new Screen(screenLeft, screenTop, Scene.CANVAS_WIDTH, Scene.CANVAS_HEIGHT, ctxWidth - Scene.CANVAS_WIDTH, ctxHeight - Scene.CANVAS_HEIGHT),
            playerInputsList: playerInputsList,
            loadSpeed: 500,
            unloadSpeed: 500,
        })
        
        this.audio.src = paths.sound('test_song.mp3')
        this.body.append(this.audio)
        this.audio.loop = true
        //this.audio.play()
    }
    
    load(objList, scrollX = 0, scrollY = 0){
        this.canvas = document.createElement('canvas')
        this.canvas.style.opacity = 0
        this.canvas.width = Scene.CANVAS_WIDTH//this.ctxWidth
        this.canvas.height = Scene.CANVAS_HEIGHT//this.ctxHeight
        this.body.append(this.canvas)
        window.scrollTo(scrollX, scrollY)
        
        this.body.append(Scene.PAUSE_HTML)
        this.pauseMenu = $('.pause-menu')
        this.pauseMenu.find('.button').click((clickEvent)=>{
            let button = $(clickEvent.target)
            let action = button.attr('action')
            
            if(action == 'main-menu'){
                this.unload('MainMenu')
            }else if(action == 'retry'){
                this.reload()
            }else if(action == 'continue'){
                this.engine.resume()
            }
            
            this.pauseMenu.hide()
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
        $(this.canvas).fadeTo(this.loadSpeed, 1)
    }
    reload(){
        this.unload(this.constructor.name)
    }
    unload(nextSceneClass){
        if(this.engine){
            this.engine.unload()
        }
        
        $(this.canvas).fadeTo(this.unloadSpeed, 0, ()=>{
            this.body.empty()
            
            let sceneClass = require(paths.scene(nextSceneClass))
            let scene = new sceneClass()
            scene.load()
        })
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
