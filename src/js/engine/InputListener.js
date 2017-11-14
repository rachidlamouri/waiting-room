class InputListener{
    constructor(playerInputsList){
        this.playerInputsList = playerInputsList
        
        $(document).unbind('keydown')
        $(document).unbind('keyup')
        
        $(document).keydown((keyEvent)=>{
            $.each(this.playerInputsList, (index, playerInputs)=>{
                playerInputs.keydown(keyEvent)
            })
        })
        
        $(document).keyup((keyEvent)=>{
            $.each(this.playerInputsList, (index, playerInputs)=>{
                playerInputs.keyup(keyEvent)
            })
        })
        
        $(window).unbind('gamepadconnected')
        $(window).unbind('gamepaddisconnected')
        
        window.addEventListener('gamepadconnected', (gamepadEvent)=>{
            console.log(gamepadEvent)
        })
    }
    
    resetInputs(inputs, gamepadInputs){
        let gamepads = navigator.getGamepads()
        
        $.each(this.playerInputsList, (index, playerInputs)=>{
            playerInputs.resetInputs(gamepads[index])
        })
    }
}
module.exports = InputListener
