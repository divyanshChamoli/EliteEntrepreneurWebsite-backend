const express = require('express');
const app = express();
// const adminRouter = require("./routes/admin")
// const userRouter = require("./routes/user");

// Middleware for parsing request bodies
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use("/admin", adminRouter)
// app.use("/user", userRouter)


//routes/user.js
// const { Router } = require("express");
// const router = Router();
const {userMiddleware,signupInputValidationMiddleware,signInInputValidationMiddleware} = require("./middleware/user");
const fillDetailsInputValidationMiddleware = require("./middleware/candidate");
// const {User,Admin,Course}= require("../db/index")
const jwt=require("jsonwebtoken");
const { JWT_SECRET } = require("./config");
const { Candidate,User } = require('./db');
// const secret="mySecret"

// User token
// username: divyansh; password: chamoli
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpdnlhbnNoIiwiaWF0IjoxNzE3OTI0ODU5fQ.Wi2l0MVdag-D1ixj6566fmLcGM79bEYbOPbQYNrC0v0


// User Routes

// {
//     "firstName":"Divyansh2",
//     "lastName":"Chamoli",
//     "email":"divyanshchamoli567@gmail.com",
//     "password":"12345678"
// }
app.post('/signup',signupInputValidationMiddleware,async (req, res) => {
    // Implement user signup logic
    const firstName=req.body.firstName
    const lastName=req.body.lastName
    const email=req.body.email
    const password=req.body.password
    const user=await User.create({
        firstName,
        lastName,
        email,
        password
    })
    res.json({
        message:"User created successfully"
    })
});

app.post('/signin',signInInputValidationMiddleware, (req, res) => {
    // Implement admin signup logic
    const email=req.body.email
    const password=req.body.password
    User.findOne({email,password})
    .then((value)=>{
        if(value){
            const authorization=jwt.sign({email:email},JWT_SECRET);
            res.json({
                token: authorization
            })
        }
    })
    .catch((e)=>{
        res.status(403).json({
            message:"User not found"
        })
    })
});

app.post('/fillDetails',fillDetailsInputValidationMiddleware,async (req,res)=>{
    // Implement user signup logic
    const firstName=req.body.firstName
    // const lastName=req.body.lastName
    const email=req.body.email
    // const password=req.body.password
    const phone=req.body.phone
    const candidate=await Candidate.create({
        firstName,
        email,
        phone
    })
    res.json({
        message:"Candidate created successfully"
    })
})


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpdnlhbnNoY2hhbW9saTU2N0BnbWFpbC5jb20iLCJpYXQiOjE3MTkwOTUzMjh9.NG9Ma_lVI9G9a3xKjys-SrH_u_Whyi4MSlDGBrBkj18
app.get('/clubMembers',userMiddleware,async (req, res) => {
    // Implement listing all courses logic
    const users=await User.find({})
    res.json({users})
});

// router.post('/courses/:courseId', userMiddleware,async (req, res) => {
//     // Implement course purchase logic
//     const courseId=req.params.courseId;
//     const username=req.username
//     try{
//         const userInDB=await User.updateOne({username},{
//             "$push":{
//                 purchasedCourses: courseId
//             }
//         })
//         res.json({
//             message:"Course purchased"
//         })
//     }
//     catch(e){
//         res.json({
//             message:"Course creation failed",
//             error:e
//         })
//     }
// });

// router.get('/purchasedCourses', userMiddleware,async (req, res) => {
//     // Implement fetching purchased courses logic
//     const username=req.username;
//     const userInDB=await User.findOne({username})
//     const courses=await Course.find({
//         _id:userInDB.purchasedCourses
//     })
//     res.json({
//         purchasedCourses:courses
//     })
// });

// module.exports = router


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



