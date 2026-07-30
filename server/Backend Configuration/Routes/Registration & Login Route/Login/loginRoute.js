const express= require("express")
const loginController= require("../../../Controllers/Registration and Login Controller/Login/loginController")

const router= express.Router();

router.post("/loginRoute/api",loginController )
module.exports= router;