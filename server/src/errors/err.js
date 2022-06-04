
class err extends Error{
    constructor(status,message){
        super()
        this.message=message
        this.status=status
    }

    static badRequest(message){
        return new err(404,message)
    }

    static internal(message){
        return new err(500,message)
    }
    static forbidden(message){
        return new err(403,message)
    }
}

module.exports = err