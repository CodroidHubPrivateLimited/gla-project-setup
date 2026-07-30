
const express= require("express")
const router= express.Router()
const {deletedUser}= require("../../Controllers/User Deletion Controller/userDeletion") 



router.delete("/user/delete/:id", deletedUser)

module.exports= router;