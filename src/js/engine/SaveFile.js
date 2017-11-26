var DataFile = Util.DataFile

class SaveFile{
    constructor(){
        $.extend(this, {
            data: undefined,
            file: new DataFile('save.txt'),
        })
        
        if(!this.file.exists()){
            this.file.mkFile()
        }
        
        try{
            this.data = JSON.parse(this.file.read())
        }catch(exception){
            // Corrupt or missing file
            this.file.write(JSON.stringify(SaveFile.BASE_CONTENTS))
            this.data = JSON.parse(this.file.read())
        }
    }
    
    save(){
        this.file.write(JSON.stringify(this.data))
    }
}
$.extend(SaveFile, {
    BASE_CONTENTS: {
        volumeOn: true,
        levels: [
            {
                name: 'Reception',
                enabled: true,
                className: 'Level1',
                action: 'level',
            },
            {
                name: 'Reunion',
                enabled: false,
                className: 'Level2',
                action: 'level',
            },
            {
                name: 'Restitution',
                enabled: false,
                className: 'Level3',
                action: 'level',
            },
            {
                name: 'Sprite Viewer',
                enabled: true,
                className: 'SpriteViewer',
                action: 'level',
            },
        ]
    },
})
module.exports = SaveFile