const USER = require('../models/user')
const ROLE = require('../models/role')
const { findEnumValues, generateJWT, toObject } = require('../utils/helper')
const { USER_ROLES} = require('../utils/enums')

/**
 * User Sign Up
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

exports.register = async (req,res,next)=>{
    try{
        let error
         let userPayload = req.body
         let { role } = userPayload
         let roleEnum  = findEnumValues(USER_ROLES,role)
         const roleFound = await ROLE.findOne({name:roleEnum});
        if(!roleFound){
            error.statusCode =  404,
            error.message = "Role Not Found"
            throw new Error(error)
        }
        userPayload.role = roleFound._id
        const user = await USER.create(userPayload)
        res.status(200).json({user,message:"User Registration Done!!!"})
        

    }catch(error){
        next(error)
    }
}


/**
 * User Login
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

exports.login = async (req,res,next)=>{
    try{

    const { email , password } = req.body
    let  user = await USER.findOne({email:email}).populate({path:'role',select:'name'})
    const validate = await user.isValidPassword(password)
    if(!validate){
        return next(null,false,"Wrong Password")
    }

    const body = { _id:user._id,email:user.email}
    const token = generateJWT({user:body})
    user = toObject(user)
    user.token = "Bearer "+token

    res.status(200).json({
        user,message : "Logged In Sucessfully"
    })
}
catch(error){
    next(error)
}
}