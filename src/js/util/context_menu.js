var remote = require('electron').remote

let ContextMenu = $.extend(
    /* Constructor */ function(elem){
        $.extend(this, {
            menu: new remote.Menu(),
            position: {
                x: 0,
                y: 0,
            },
        })
        
        let contextMenu = this
        elem.contextmenu(function(mouseEvent){
            mouseEvent.preventDefault()
            mouseEvent.stopPropagation()
            
            contextMenu.position.x = mouseEvent.clientX
            contextMenu.position.y = mouseEvent.clientY
            contextMenu.menu.popup(remote.getCurrentWindow())
        })
        
        this.menu.append(new remote.MenuItem({
            label: 'Inspect Element',
            click: function(menuItem, browserWindow, clickEvent){
                let position = contextMenu.getPosition()
                remote.getCurrentWindow().inspectElement(position.x, position.y)
            },
        }))
    },
    /* Instance */{prototype:{
        getMenu(){
            return this.menu
        },
        getPosition(){
            return this.position
        },
    }}
)
module.exports = ContextMenu