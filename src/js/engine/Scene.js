var remote = require('electron').remote

var saveFile = EngineUtil.saveFile

var SrcFile = Util.SrcFile
var paths = Util.paths
var Engine = EngineUtil.Engine
var Vect = EngineUtil.Vect
var GameObj = EngineUtil.GameObj
var Input = EngineUtil.Input
var PlayerInputs = EngineUtil.PlayerInputs
var Sound = EngineUtil.Sound

class Scene{
    constructor(ctxWidth, ctxHeight, screenLeft, screenTop, songPath, nextUnlockIndex, playerInputsList, staticMenu = false){
        if(document.readyState !== 'complete'){
            throw new Scene.DocumentNotReadyException()
        }
        
        if(playerInputsList.length < 1){
            playerInputsList.push(new PlayerInputs())
        }
        
        if(playerInputsList.length < 2){
            playerInputsList.push(new PlayerInputs())
        }
        
        playerInputsList[0].addInput('reloadScene', new Input(['r', 'R'], [Input.SELECT]))
        playerInputsList[0].addInput('menuUp', new Input(['w', 'W', 'ArrowUp'], [Input.PAD_UP]))
        playerInputsList[0].addInput('menuDown', new Input(['s', 'S', 'ArrowDown'], [Input.PAD_DOWN]))
        playerInputsList[0].addInput('menuSelect', new Input(['Enter'], [Input.A]))
        
        playerInputsList[1].addInput('reloadScene', new Input([], [Input.SELECT]))
        playerInputsList[1].addInput('menuUp', new Input([], [Input.PAD_UP]))
        playerInputsList[1].addInput('menuDown', new Input([], [Input.PAD_DOWN]))
        playerInputsList[1].addInput('menuSelect', new Input([], [Input.A]))
        
        if(!staticMenu){
            playerInputsList[0].addInput('pause', new Input(['Escape'], [Input.START]))
            playerInputsList[0].addInput('menuEscape', new Input(['Enter'], [Input.B]))
            
            playerInputsList[1].addInput('pause', new Input([], [Input.START]))
            playerInputsList[1].addInput('menuEscape', new Input([], [Input.B]))
        }
        
        $.extend(this, {
            audio: $('<audio></audio>')[0],
            body: $('body'),
            ctxWidth: ctxWidth,
            ctxHeight: ctxHeight,
            gamepadElem: $(Scene.GAMEPAD_HTML),
            nextUnlockIndex: nextUnlockIndex,
            screen: new Screen(screenLeft, screenTop, Scene.CANVAS_WIDTH, Scene.CANVAS_HEIGHT, ctxWidth - Scene.CANVAS_WIDTH, ctxHeight - Scene.CANVAS_HEIGHT),
            playerInputsList: playerInputsList,
            loadSpeed: 500,
            unloadSpeed: 500,
        })
        
        this.body.append(this.gamepadElem)
        
        this.volumeOn = saveFile.data.volumeOn
        
        if(songPath != undefined){
            this.audio.src = paths.sound(songPath)
        }
        this.body.append(this.audio)
        this.audio.loop = true
    }
    
    fadeIn(){
        this.audio.volume = 0
        if(this.audio.src != ''){
            this.audio.play()
        }
        
        if(this.volumeOn){
            $(this.audio).animate({volume: 1}, this.loadSpeed)
        }
        $(this.canvas).fadeTo(this.loadSpeed, 1)
    }
    load(objList, scrollX, scrollY){
        this.loadCanvas(scrollX, scrollY)
        this.loadMenu(Scene.PAUSE_HTML)
        this.loadEngine(objList)
        this.fadeIn()
    }
    loadCanvas(scrollX = 0, scrollY = 0){
        this.canvas = document.createElement('canvas')
        this.canvas.style.opacity = 0
        this.canvas.width = Scene.CANVAS_WIDTH//this.ctxWidth
        this.canvas.height = Scene.CANVAS_HEIGHT//this.ctxHeight
        this.body.append(this.canvas)
        window.scrollTo(scrollX, scrollY)
    }
    loadEngine(objList){
        this.engine = new Engine(this, this.playerInputsList)
        
        let menuController = new GameObj(0, 0, 0, 0, {
            draw: false,
            simpleUpdate: function(engine){
                let inputs1 = engine.getPlayerInputStates(0)
                let inputs2 = engine.getPlayerInputStates(1)
                
                this.checkSimpleAction(inputs1.pause || inputs2.pause, 'pause', ()=>{
                    if(engine.isRunning()){
                        engine.pause()
                    }else if(engine.isPaused()){
                        engine.resume()
                    }
                })
                
                this.checkSimpleAction(inputs1.reloadScene || inputs2.reloadScene, 'reloadScene', ()=>{
                    remote.getCurrentWindow().reload()
                    //engine.scene.reload()
                })
                
                this.checkSimpleAction((inputs1.menuUp || inputs2.menuUp) && this.menuElem.is(':visible'), 'menuUp', ()=>{
                    this.selectedButton--
                    if(this.selectedButton < 0){
                        this.selectedButton = this.menuButtonElems.length - 1
                    }
                    
                    this.menuButtonElems.removeClass('selected')
                    $(this.menuButtonElems[this.selectedButton]).addClass('selected')
                    new Sound('walking_millie')
                })
                
                this.checkSimpleAction((inputs1.menuDown || inputs2.menuDown) && this.menuElem.is(':visible'), 'menuDown', ()=>{
                    this.selectedButton++
                    if(this.selectedButton >= this.menuButtonElems.length){
                        this.selectedButton = 0
                    }
                    
                    this.menuButtonElems.removeClass('selected')
                    $(this.menuButtonElems[this.selectedButton]).addClass('selected')
                    new Sound('walking_millie')
                })
                
                this.checkSimpleAction((inputs1.menuSelect || inputs2.menuSelect) && this.menuElem.is(':visible'), 'menuSelect', ()=>{
                    $(this.menuButtonElems[this.selectedButton]).trigger('click')
                    new Sound('thump1')
                })
                
                this.checkSimpleAction((inputs1.menuEscape || inputs2.menuEscape) && this.menuElem.is(':visible'), 'menuEscape', ()=>{
                    if(engine.isPaused()){
                        engine.resume()
                    }
                })
            },
        })
        menuController.menuElem = this.menuElem
        menuController.selectedButton = 0
        menuController.menuButtonElems = this.menuButtonElems
        
        objList.push(menuController)
        $.each(objList, (index, obj)=>{
            this.engine.addObj(obj)
        })
        
        this.engine.start()
    }
    loadLevelTitle(x, y, title){
        const LevelTitle = require(paths.obj('LevelTitle'))
        
        let levelTitle = new LevelTitle(x, y, title)
        this.engine.addObj(levelTitle)
        
        return levelTitle
    }
    loadMenu(html, levelData = []){
        this.body.append(html)
        this.menuElem = $('.menu')
        
        $.each(levelData, (index, data)=>{
            if(!data.enabled){
                return
            }
            
            let buttonElem = $(Scene.BUTTON_HTML)
            let titleElem = buttonElem.find('.level-title')
            let countGroupElems = buttonElem.find('.count-group')
            let boneCountElem = buttonElem.find('.bone-count')
            let poopCountElem = buttonElem.find('.poop-count')
            
            let boneGroupElem = $(countGroupElems[0])
            let poopGroupElem = $(countGroupElems[1])
            
            let boneFilename = index == 1? 'millie_bone': 'treat_coco'
            boneGroupElem.find('img')[0].src = paths.asset(boneFilename)
            poopGroupElem.find('img')[0].src = paths.asset('treat_millie')
            
            if(data.boneCount != undefined){
                boneCountElem.html(data.bonesCollected+' / '+data.boneCount)
            }else{
                boneGroupElem.hide()
            }
            
            if(data.poopCount != undefined){
                poopCountElem.html(data.poopsCollected+' / '+data.poopCount)
            }else{
                poopGroupElem.hide()
            }
            
            titleElem.html(data.name)
            buttonElem.attr('class-name', data.className)
            this.menuElem.append(buttonElem)
        })
        
        this.menuButtonElems = this.menuElem.find('.button')
        $(this.menuButtonElems[0]).addClass('selected')
        this.menuButtonElems.click((clickEvent)=>{
            let button = $(clickEvent.currentTarget)
            let action = button.attr('action')
            
            if(action == 'level'){
                let levelClass = button.attr('class-name')
                this.unload(levelClass)
            }else if(action == 'main-menu'){
                this.unload('MainMenu')
            }else if(action == 'retry'){
                this.reload()
            }else if(action == 'continue'){
                this.engine.resume()
            }
            
            this.menuElem.hide()
        })
        
        this.volumeElem = $('.volume-icon')
        this.volumeElem.addClass(this.volumeOn? Scene.CLASS_ON: Scene.CLASS_OFF)
        
        this.volumeElem.on('mouseenter', (mouseEvent)=>{
            let oldClass = this.volumeOn? Scene.CLASS_ON: Scene.CLASS_OFF
            let newClass = this.volumeOn? Scene.CLASS_OFF: Scene.CLASS_ON
            this.volumeElem.removeClass(oldClass)
            this.volumeElem.addClass(newClass)
        })
        
        this.volumeElem.on('mouseleave', (mouseEvent)=>{
            let oldClass = this.volumeOn? Scene.CLASS_OFF: Scene.CLASS_ON
            let newClass = this.volumeOn? Scene.CLASS_ON: Scene.CLASS_OFF
            this.volumeElem.removeClass(oldClass)
            this.volumeElem.addClass(newClass)
        })
        
        this.volumeElem.click((clickEvent)=>{
            this.volumeOn = !this.volumeOn
            
            let oldClass = this.volumeOn? Scene.CLASS_OFF: Scene.CLASS_ON
            let newClass = this.volumeOn? Scene.CLASS_ON: Scene.CLASS_OFF
            this.volumeElem.removeClass(oldClass)
            this.volumeElem.addClass(newClass)
            
            this.audio.volume = this.volumeOn? 1: 0
            saveFile.data.volumeOn = this.volumeOn
            saveFile.save()
        })
    }
    reload(){
        this.unload(this.constructor.name)
    }
    unload(nextSceneClass){
        if(this.engine){
            this.engine.unload()
        }
        
        $(this.audio).animate({volume: 0}, this.unloadSpeed)
        $(this.canvas).fadeTo(this.unloadSpeed, 0, ()=>{
            this.body.empty()
            
            let sceneClass = require(paths.scene(nextSceneClass))
            let scene = new sceneClass()
            scene.load()
        })
    }
    unlockNextLevel(){
        let nextLevel = saveFile.data.levels[this.nextUnlockIndex]
        if(!nextLevel.enabled){
            nextLevel.enabled = true
            saveFile.save()
        }
    }
}
$.extend(Scene, {
    CANVAS_WIDTH: 320,
    CANVAS_HEIGHT: 240,
    
    PAUSE_HTML: (new SrcFile('html/pause_menu.html')).read(),
    GAMEPAD_HTML: (new SrcFile('html/gamepad_detected.html')).read(),
    BUTTON_HTML: (new SrcFile('html/level_button.html')).read(),
    
    CLASS_ON: 'fa-volume-up',
    CLASS_OFF: 'fa-volume-off',
    
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
