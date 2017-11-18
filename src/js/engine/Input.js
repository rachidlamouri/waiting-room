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
            this.pressed = this.pressed || keyInputs[key].pressed
        })
        
        if(gamepad == null){
            return
        }
        
        $.each(this.buttonIndices, (index, buttonIndex)=>{
            this.pressed = this.pressed || gamepad.buttons[buttonIndex].pressed
        })
    }
}
$.extend(Input, {
    A: 0,
    B: 1,
    X: 2,
    Y: 3,
    LB: 4,
    RB: 5,
    LT: 6,
    RT: 7,
    SELECT: 8,
    START: 9,
    L_CLICK: 10,
    R_CLICK: 11,
    PAD_UP: 12,
    PAD_DOWN: 13,
    PAD_LEFT: 14,
    PAD_RIGHT: 15,
})
module.exports = Input
