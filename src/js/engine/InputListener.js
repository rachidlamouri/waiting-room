class InputListener{
    constructor(playerInputsList){
        this.playerInputsList = playerInputsList
        
        $.extend(this, {
            playerInputsList: playerInputsList,
            keyDown: (keyEvent)=>{
                $.each(this.playerInputsList, (index, playerInputs)=>{
                    playerInputs.keydown(keyEvent)
                })
            },
            keyUp: (keyEvent)=>{
                $.each(this.playerInputsList, (index, playerInputs)=>{
                    playerInputs.keyup(keyEvent)
                })
            },
            gamepadConnected: (gamepadEvent)=>{
                console.log(gamepadEvent)
            },
        })
        
        $(document).on('keydown', this.keyDown)
        $(document).on('keyup', this.keyUp)
        $(window).on('gamepadconnected', this.gamepadConnected)
    }
    
    resetInputs(inputs, gamepadInputs){
        let gamepads = navigator.getGamepads()
        
        $.each(this.playerInputsList, (index, playerInputs)=>{
            playerInputs.resetInputs(gamepads[index])
        })
    }
    unload(){
        $(document).off('keydown', this.keyDown)
        $(document).off('keyup', this.keyUp)
        $(window).off('gamepadconnected', this.gamepadConnected)
    }
}
module.exports = InputListener
