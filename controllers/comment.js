const COMMENT = require('../models/comment')
const POST = require('../models/post')

/**
 * USER COMMENT
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

exports.addComment = async (req,res,next)=>{
    try{
        const payload = req.body;
        payload.user = req.user._id;
        const comment = await COMMENT.create(payload);
        await POST.findByIdAndUpdate({_id: payload.post, isDeleted: false}, {comments: comment._id});
         res.status(200).json({
            comment,
            message: "comment added"
         })

    }catch(error){
        next(error)
    }


}
