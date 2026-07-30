const express= require("express")
const app= express()
const connectDB= require("./Backend Configuration/Configuration Folders/DB Configuration/dbCofig")
const cors=require("cors")
const RegistrationApi= require("./Backend Configuration/Routes/Registration & Login Route/Register/register")
const getUsers= require("./Backend Configuration/Routes/Get All User Route/getUser")
const deleteUsers= require("./Backend Configuration/Routes/User Data Deleted/userDataDelete")
const updatedUser= require("./Backend Configuration/Routes/User Updation Route/userUpdateRoute")
const LoginRoute= require("./Backend Configuration/Routes/Registration & Login Route/Login/loginRoute")



app.use(express.json())
app.use(cors())

connectDB()



app.use("/api", RegistrationApi)
app.use("/api", getUsers)
app.use("/api", deleteUsers)
app.use("/api", updatedUser)
app.use("/api",LoginRoute)




app.listen(4000,()=>{
    console.log("Your Server is running at port 4000")
})



// HTML 
// CSS
// JS
// React 
// NodeJS 