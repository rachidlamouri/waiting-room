var remote = require('electron').remote
var menu = new remote.Menu()

// Call this module once and save it in the window object
var Debug = {
    ATTR_OPEN_TOOLS: 'open-tools',
    
    KEY_REFRESH: 'F5',
    KEY_TOGGLE_DEV_TOOLS: 'F12',
    
    init(){
        // Inspect element menu
        let contextPosition
        let menuItem = new remote.MenuItem({
            label: 'Inspect Element',
            click: function(){
                remote.getCurrentWindow().inspectElement(contextPosition.x, contextPosition.y)
            }
        })
        menu.append(menuItem)
        
        // Inspect element listener
        $(document).contextmenu(function(mouseEvent){
            mouseEvent.preventDefault()
            contextPosition = {
                x: mouseEvent.clientX,
                y: mouseEvent.clientY
            }
            menu.popup(remote.getCurrentWindow())
        })
        
        // Refresh + dev tools listener
        $(document).keydown(function(keyEvent){
            if(keyEvent.key == Debug.KEY_REFRESH){
                remote.getCurrentWindow().reload()
            }else if(keyEvent.key == Debug.KEY_TOGGLE_DEV_TOOLS){
                remote.getCurrentWindow().toggleDevTools()
            }
        })
        
        // Open dev tools
        let openDevToolsMeta = $(Debug.ATTR_OPEN_TOOLS.toAttr())
        if(openDevToolsMeta.length > 0 && openDevToolsMeta.attr(Debug.ATTR_OPEN_TOOLS).toBool()){
            remote.getCurrentWindow().webContents.openDevTools()
        }
    },
}
Debug.init()

module.exports = Debug




