const express = require("express");
const router = express.Router();
const {
    loggedInUser,
    signInUser,
    signUpUser,
} = require("../controllers/auth.controller");
const { checkAuth } = require("../middleware/checkAuth");

//
router.route("/signIn").post(signInUser);

router.route("/signUp").post(signUpUser);

router.route("/current").get(checkAuth, loggedInUser);

module.exports = router;
