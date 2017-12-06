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
                bonesCollected: 0,
                boneCount: 12,
            },
            {
                name: 'Reunion',
                enabled: false,
                className: 'Level2',
                action: 'level',
                bonesCollected: 0,
                boneCount: 5,
                poopsCollected: 0,
                poopCount: 3,
            },
            {
                name: 'Rehearsal',
                enabled: false,
                className: 'Level3',
                action: 'level',
            },
            {
                name: 'Restitution',
                enabled: false,
                className: 'Level4',
                action: 'level',
            },
            {
                name: 'Revival',
                enabled: false,
                className: 'BonusLevel',
                action: 'level',
            },
        ]
    },
})
module.exports = SaveFile