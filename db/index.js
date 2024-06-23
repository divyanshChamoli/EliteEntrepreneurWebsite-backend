const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://divyanshchamoli:wxvn7144@cluster0.qrzriqj.mongodb.net/eliteDb')
.then(()=>console.log("connected to db"))

// Define schemas
// const AdminSchema = new mongoose.Schema({
//     // Schema definition here
//     username: String,
//     password: String
// });
const CandidateSchema = new mongoose.Schema({
    // Schema definition here
    firstName: String,
    email: String,
    phone: Number
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    firstName: String,
    lastName: String,
    email: String,
    password: String
    // purchasedCourses:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Course'
    // }]
});

// const CourseSchema = new mongoose.Schema({
//     // Schema definition here
//     title: String,
//     description: String,
//     price: Number,
//     imageLink: String
// });

const Candidate = mongoose.model('Candidate', CandidateSchema);
const User = mongoose.model('User', UserSchema);
// const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    // Admin,
    User,
    Candidate
    // Course
}