class Input{
    constructor(name, key, overrideList = []){
        $.extend(this, {
            name: name,
            key: key,
            overrideList: overrideList
        })
    }
}
module.exports = Input
