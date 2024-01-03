const passport = require('passport')
require('../middlewares/passport')

const handleJWT = (req, res, next, roles) => async (err, user, info) => {
  try {
      if (roles !== undefined) {
          roles = typeof roles === 'string' ? [roles] : roles;
          console.log("===================");

          if (!roles.includes(user.role.name)) {
              console.log("222222222222222");
              res.status(403).json({message:'You dont have sufficient access permissions.'})
          }
      }

      req.user = user;
      return next();
  } catch (err) {
      next(err);
  }
};

exports.isAuth = (roles) => (req,res,next) => {
    passport.authenticate('authentication',{session:false} , handleJWT(req,res,next,roles))(req,res,next)
}