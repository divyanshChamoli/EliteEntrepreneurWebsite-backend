//Contains zod types
const zod=require("zod");

const signUp=zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8)
})

const signIn=zod.object({
    email: zod.string().email(),
    password: zod.string().min(8)
})

const fillDetails=zod.object({
    firstName: zod.string(),
    email: zod.string().email(),
    phone: zod.number()
})

module.exports = {
    signUp,
    signIn,
    fillDetails
}