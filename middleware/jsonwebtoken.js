// Import the jsonwebtoken package to work with JWT tokens
const jwt = require('jsonwebtoken');

// Import the User model from models folder
const User  = require('../models/user');

// Import the Vendor model from models folder
const Vendor = require('../models/vendor');


// This function checks if user is logged in
const auth =  async (req,res,next)  => {
    try {

        // Get the token from request header
        const token = req.header('x-auth-token');

        // If there is no token, stop and send error
        if(!token){
            return res.status(401).json({error: "No authentication token"});
        }

        // Check if the token is real and correct using secret key
        const verified = jwt.verify(token, 'passwordKey');

        // If token is not valid, send error
        if(!verified){
            return res.status(401).json({error: "token verification failed"});
        }

        // Find user by ID from token
        // If not found in User, check in Vendor
        const user = await User.findById(verified.id) || await Vendor.findById(verified.id);

        // If no user or vendor found, send error
        if(!user){
            return res.status(401).json({error: "user or vendor not found"});
        }

        // Save user data inside request
        req.user = user;

        // Save token inside request
        req.token = token;

        // Go to next function
        next();

    } catch (e) {

        // If something breaks, send server error
        return res.status(500).json({error: e.message});
    }
};


// This function checks if the logged-in person is a vendor
const vendorAuth = (req,res,next) => {

   try {

     // If role does not exist or role is not vendor
     if(!req.user.role || req.user.role !== 'vendor'){
        
        // Stop and send access denied message
        return res.status(403).json({msg: "Access denied, only vendors allowed"});
    }

    // If role is vendor, continue
    next();
    
   } catch (e) {

    // If error happens, send server error
    return res.status(500).json({error: e.message});
   }
};

// Export both functions so other files can use them
module.exports = {auth, vendorAuth};