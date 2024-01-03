const jwt = require('jsonwebtoken')
const { secretKeys } = require('../configurations/config')

/*
To get enum values 
*/

exports.findEnumValues = (enumObject,keyToMatch)=>{
    for (const key in enumObject){
        if(key === keyToMatch){

            return enumObject[key]
        }   
    }
    return null
}

/*
used to generate jwt token
*/

exports.generateJWT = (obj)=> jwt.sign(obj,secretKeys.jwt)


/*
used to convert 
*/
exports.toObject = (json)=> JSON.parse(JSON.stringify(json))
