const express = require("express");

const {
  registerUser,
} = require("../../../Controllers/Registration and Login Controller/Registration/registrationController");

const router = express.Router();

router.post("/", registerUser);

module.exports = router;