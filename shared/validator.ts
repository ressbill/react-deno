export class validator {
    static isLength(arg: string, options: {min?: Number, max?: Number}): Boolean {
        if (options.min && options.max) {
            return arg.length > options.min && arg.length < options.max
        }
        if(options.min) {
            return arg.length > options.min
        }
        if(options.max) {
            return arg.length < options.max
        } 
        return false
    }
    static isEmail(email: string): Boolean {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)     
    }
}