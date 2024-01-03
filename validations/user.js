const joi = require('joi')
const {USER_ROLES} = require('../utils/enums')

exports.register = {
      body : joi.object({
        username : joi.string().required().max(50).min(3),
        password: joi.string().required().max(15).min(8),
        email: joi.string().required().email(),
        role : joi.string().required().valid(...Object.values(USER_ROLES))
      })
}


exports.login = {
    body : joi.object({
      password: joi.string().required().max(15).min(8),
      email: joi.string().required().email(),
    })
}