exports.errorHandler = async(err,req,res,next)=>{   
    const errStatus = err.statusCode || 500
    let errMessage;
    
    if(err.details ){
        if(err.details.body){
         errMessage = err.details.body[0].message
        }
       else if(err.details.params){
            errMessage = err.details.params[0].message
           }
      else if(err.details.query){
        errMessage = err.details.query[0].message
           }
    }
    
    res.status(errStatus).json({
        status : errStatus,
        error : err.message,
        message : errMessage
    })

}