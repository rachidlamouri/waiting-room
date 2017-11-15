var remote = require('electron').remote

class ContextMenu{
    constructor(elem){
        $.extend(this, {
            menu: new remote.Menu(),
            position: {
                x: 0,
                y: 0,
            },
        })
        
        elem.contextmenu(mouseEvent => {
            mouseEvent.preventDefault()
            mouseEvent.stopPropagation()
            
            this.position.x = mouseEvent.clientX
            this.position.y = mouseEvent.clientY
            this.menu.popup(remote.getCurrentWindow())
        })
        
        this.menu.append(new remote.MenuItem({
            label: 'Inspect Element',
            click: (menuItem, browserWindow, clickEvent) => {
                remote.getCurrentWindow().inspectElement(this.position.x, this.position.y)
            },
        }))
    }
    getMenu(){
        return this.menu
    }
    getPosition(){
        return this.position
    }
}
module.exports = ContextMenu