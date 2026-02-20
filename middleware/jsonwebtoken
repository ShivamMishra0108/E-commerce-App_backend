const jwt = require('jsonwebtoken');
const User  = require('../models/user');
const Vendor = require('../models/vendor');

const auth =  async (req,res,next)  => {
    try {
        const token = req.header('x-auth-token');

        if(!token){
            return res.status(401).json({error: "No authentication token"});
        }

        // verify the jwt token using secret key 
        const verified = jwt.verified(token, 'passwordKey');

        if(!verified){
            return res.status(401).json({error: "token verification failed"});
        }
 
        const user = await User.findById(verified.id) || await Vendor.findById(verified.id);

        if(!user){
            return res.status(401).json({error: "user or vendor not found"});
        }

        req.user = user;

        req.token = token;

         next();

    } catch (e) {
        return res.status(500).json({error: e.message});
    }
};



// Vendoor authentication Middeware
// This middleware ensures that the user making the request is a vendor
// It should be used for routes that only vendor can access

const vendorAuth = (req,re,next) => {

   try {
     if(!req.user.role || req.user.role!=='vendor'){
        return res.status(403).json({msg: "Access denied , only users are allowed"});
    }

    next();
    
   } catch (e) {
    return res.status(500).json({error: e.message});
   }
};


module.exports = {auth,vendorAuth};