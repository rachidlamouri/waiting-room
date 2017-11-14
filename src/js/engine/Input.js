class Input{
    constructor(keyList = [], buttonIndices = []){
        $.extend(this, {
            keyList: keyList,
            buttonIndices: buttonIndices,
            pressed: false,
        })
    }
    
    reset(keyInputs, gamepad){
        this.pressed = false
        
        $.each(this.keyList, (index, key)=>{
            this.pressed |= keyInputs[key].pressed
        })
        
        if(gamepad == null){
            return
        }
        
        $.each(this.buttonIndices, (index, buttonIndex)=>{
            this.pressed |= gamepad.buttons[buttonIndex].pressed
        })
    }
}
module.exports = Input
