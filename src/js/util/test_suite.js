var TestSuite = $.extend(
    /* Constructor */ function(title, init = function(){}){
        console.groupCollapsed(`%c${title}`, 'font-weight: bold; font-size: 16px;')
        init.call(this)
    },
    /* Global */{
        CHARS: 'abcdefghijklmnopqrstuvwxyz1234567890',
        
        AssertionFailedException: function(title, value, expected){
            this.message = `${title}: expected ${expected} was ${value}`
        },
        
        randomText(length = 20){
            let string = ''
            for(let i=0; i < length; i++){
                string += TestSuite.CHARS.charAt(Math.floor(Math.random() * TestSuite.CHARS.length))
            }
            return string
        },
    },
    /* Instance */{prototype:{
        assert(title, value, expected, endSuiteOnFail = true){
            if(value != expected){
                if(endSuiteOnFail){
                    this.end()
                }
                
                throw new TestSuite.AssertionFailedException(title, value, expected)
            }else{
                console.log(`%c  ${title}: passed`, 'color: green;')
            }
        },
        end(){
            console.groupEnd()
            return this
        },
        section(title, tests = function(){}){
            console.log(title)
            try{
                tests.call(this)
            }catch(exception){
                this.end()
                throw exception
            }
            
            return this
        },
    }}
)
module.exports = TestSuite

