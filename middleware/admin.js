const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("../config")

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const authorization=req.headers.authorization;
    const token=authorization.split(" ")[1];

    try{
        const verifiedToken=jwt.verify(token,JWT_SECRET)
        if(verifiedToken.username){
            next()
        }
        else{
            res.status(403).json({
                message:"Admin Username not found "
            })
        }
    }
    catch{
        res.status(403).json({
            message:"Admin not found"
        })
    }
}

module.exports = adminMiddleware;