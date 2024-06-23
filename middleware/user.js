const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("../config")
const  {signIn, signUp}=require("../zodTypes")

function signupInputValidationMiddleware(req,res,next){
    const firstName=req.body.firstName
    const lastName=req.body.lastName
    const email=req.body.email
    const password=req.body.password
    const createPayload={
        firstName,
        lastName,
        email,
        password
    }
    const parsedPayload=signUp.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).send({
            message:"You sent the wrong inputs"
        })
        return;
    }
    else{
        next();
    }

}

function signInInputValidationMiddleware(req,res,next){
    const email=req.body.email
    const password=req.body.password
    const createPayload={
        email,
        password
    }
    const parsedPayload=signIn.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).send({
            message:"You sent the wrong inputs"
        })
        return;
    }
    else{
        next();
    }

}

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const authorization=req.headers.authorization;
    if(authorization==undefined){
        res.status(401).json({
            message:"Unauthorized access"
        })
    }
    const token=authorization.split(" ")[1];

    try{
        const verifiedToken=jwt.verify(token,JWT_SECRET);
        if(verifiedToken.email){
            //populate req object because this info will be used by other middlewares also
            req.email=verifiedToken.email;
            next()

        }
        else{
            res.status(403).json({
                message:"User username not found"
            })
        }
    }
    catch(e){

        res.status(403).json({
            message:"User not found",
            error: e
        })
    }

    

    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    // const authorization=req.headers.authorization;
    // const token=authorization.split(" ")[1];

    // try{
    //     const verifiedToken=jwt.verify(token,JWT_SECRET)
    //     console.log("adminMiddleware verifiedToken ",verifiedToken)
    //     const verifiedTokenUsername=verifiedToken.username;
    //     console.log("adminMiddleware verifiedTokenUsername ",verifiedTokenUsername)
    //     if(verifiedToken.username){
    //         next()
    //     }
    //     else{
    //         res.status(403).json({
    //             message:"Admin Username not found "
    //         })
    //     }
    // }
    // catch{
    //     res.status(403).json({
    //         message:"Admin not found"
    //     })
    // }
}

module.exports ={
    userMiddleware,
    signInInputValidationMiddleware,
    signupInputValidationMiddleware
}