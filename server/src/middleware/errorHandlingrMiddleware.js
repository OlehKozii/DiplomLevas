const error=require("../errors/err.js")

module.exports = function(err,req,res,next){
    if(err instanceof error){
        return res.status(err.status).json({message:err.message})
    }
    return res.status(400).json({message:"Unexpected error"})
}