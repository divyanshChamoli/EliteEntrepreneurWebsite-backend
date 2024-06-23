const  {fillDetails}=require("../zodTypes")


function fillDetailsInputValidationMiddleware(req,res,next){
    const firstName=req.body.firstName
    const email=req.body.email
    const phone=req.body.phone
    const createPayload={
        firstName,
        email,
        phone
    }
    const parsedPayload=fillDetails.safeParse(createPayload);
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

module.exports=fillDetailsInputValidationMiddleware;