var remote = require('electron').remote
var ContextMenu = window.ContextMenu

var Debug = $.extend(
    /* Constructor */ function(){
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
    /* Global */{
        ATTR_OPEN_TOOLS: 'open-tools',
    
        KEY_REFRESH: 'F5',
        KEY_TOGGLE_DEV_TOOLS: 'F12',
    },
)
module.exports = Debug
