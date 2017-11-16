var KeyInput = EngineUtil.KeyInput

class PlayerInputs{
    constructor(inputs){
        $.extend(this, {
            inputs: inputs,
            keyInputs: {},
        })
        
        $.each(this.inputs, (index, input)=>{
            $.each(input.keyList, (index, key)=>{
                this.keyInputs[key] = new KeyInput(key)
            })
        })
    }
    
    keydown(keyEvent){
        $.each(this.keyInputs, (key, keyInput)=>{
            keyInput.keydown(keyEvent)
        })
    }
    keyup(keyEvent){
        $.each(this.keyInputs, (key, keyInput)=>{
            keyInput.keyup(keyEvent)
        })
    }
    resetInputs(gamepad){
        $.each(this.inputs, (index, input)=>{
            input.reset(this.keyInputs, gamepad)
        })
    }
}
module.exports = PlayerInputs
