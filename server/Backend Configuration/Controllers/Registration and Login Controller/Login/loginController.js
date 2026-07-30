const User= require("../../../Models/UserSchema/user")
const bcrypt= require("bcrypt")
const { response } = require("express")
const jwt= require("jsonwebtoken")

const loginController=async(req,res)=>{
try {

    const{email,password}=req.body

    const existingUser= await User.findOne({email})
    console.log("My exsiting user Data",existingUser )
    if(!existingUser){
        console.log("user Not Found")
    }

    const matchedPassword= await bcrypt.compare(password,existingUser.password)
    if(!matchedPassword){
        console.log("Password is Invalid")
    }


    const secretKey="Dikshant16121999Chakrayat@123"
    const token= await jwt.sign({id:existingUser._id,email:existingUser.email, role:existingUser.role}, secretKey)

    res.json({
        message:"Loged in Sucessfully",
        token
    })


} catch (error) {
    console.log(error.message)
    console.log(error)
    res.json("User Not Found")
}
}
module.exports=loginController