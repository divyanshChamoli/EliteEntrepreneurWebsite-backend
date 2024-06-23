const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Admin,Course}= require("../db/index")
const jwt=require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const secret="mySecret"

// User token
// username: divyansh; password: chamoli
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpdnlhbnNoIiwiaWF0IjoxNzE3OTI0ODU5fQ.Wi2l0MVdag-D1ixj6566fmLcGM79bEYbOPbQYNrC0v0


// User Routes
router.post('/signup',async (req, res) => {
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

router.post('/signin', (req, res) => {
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
});

// router.get('/courses',async (req, res) => {
//     // Implement listing all courses logic
//     const courses=await Course.find({})
//     res.json({
//         courses:courses
//     })
// });

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

module.exports = router