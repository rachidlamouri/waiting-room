class Wall extends GameObj{
    constructor(x, y, width, height){
        super(x, y, width, height, {
            collider: true,
        })
    }
}
module.exports = Wall
