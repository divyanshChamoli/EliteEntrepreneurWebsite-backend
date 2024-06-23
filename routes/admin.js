const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("../config")
const {Admin,Course}=require("../db/index")

// Admin Routes
router.post('/signup',async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;

    try{
        const admin=await Admin.create({
            username:username,
            password:password
        })
        res.json({
            messsage:"Admin created successfully"
        })        
    }
    catch{
        res.json({
            message: "Admin creation failed"
        })
    }

});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;

    Admin.findOne({
        username,
        password
    })
    .then((value)=>{
        if(value){
            //Admin exists
            //return jwt
            // username: akshat ; password: dwivedi
            // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFrc2hhdCIsImlhdCI6MTcxNzkyNDMzNn0.KZAeqqBotN01vJMquceEWX2cPKurRdlWJmgdvZOr5o8
            const Authorization=jwt.sign({username:username},JWT_SECRET)
            res.json({
                token: Authorization
            })
        }
        else{
            res.status(403).json({
                message:"Invalid credentials"
            })   
        }
    })


});

router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    const title=req.body.title;
    const description=req.body.description;
    const price=req.body.price;
    const imageLink=req.body.imageLink;

    try{
    const course = await Course.create({
        title,
        description,
        price,
        imageLink
    })
    res.json({
        message: 'Course created successfully', 
        courseId: course._id
    })
    }
    catch(e){
        res.status(403).json({
            message:"Invalid credentials"
        })
    }


});

router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic
    const courses= await Course.find({})
    res.json({
        courses: courses
    })
});

module.exports = router;