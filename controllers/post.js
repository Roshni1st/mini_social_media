
const POST = require('../models/post')
const USER = require('../models/user')

/**
 * USER POST
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

exports.postCreation = async (req,res,next)=>{
    try{
        const payload = req.body
        payload.user = req.user._id
         const post = await POST.create(payload)
         res.status(200).json({
            post,
            message: "POST DONE"
         })

    }catch(error){
        next(error)
    }


}

/**
 * Shows post by user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.showPosts = async (req,res,next)=>{
    try{
        const _id = req.params.id
         const post = await POST.findOne({_id,is_deleted:false}).populate({path:"user",select:"username"})
         .populate({path: 'comments', select: 'message', populate: {path: 'user', select: 'username'}});
         
         res.status(200).json({
            post,
         })

    }catch(error){
        next(error)
    }


}

/**
 * delete post
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

exports.removePost = async (req,res,next) =>{
    try{
        console.log("hello");
        const id = req.params.id
        const post = await USER.findByIdAndDelete(id)
        res.status(200).json({ message : "Post removed successfully "})

    }catch(err){
        next(err)
    }

}

/**
 * delete post
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.editPost = async (req,res,next) =>{
    try{
        const id = req.params.id
        console.log("id",id);
        const payload = req.body
        console.log("payload",payload);
        const post = await POST.findOneAndUpdate({id, payload,new : true})
        res.status(200).json({ post,message : "Post updated successfully "})

    }catch(err){
        next(err)
    }

}