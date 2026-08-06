const express = require("express");

const {
  loginUser,
} = require("../../../Controllers/Registration and Login Controller/Login/loginController");

const router = express.Router();

// POST /api/auth/login
router.post("/", loginUser);

module.exports = router;