class KeyInput{
    constructor(key){
        $.extend(this, {
            key: key,
            pressed: false,
        })
    }
    
    keydown(keyEvent){
        if(keyEvent.key == this.key){
            this.pressed = true
        }
    }
    keyup(keyEvent){
        if(keyEvent.key == this.key){
            this.pressed = false
        }
    }
}
module.exports = KeyInput
