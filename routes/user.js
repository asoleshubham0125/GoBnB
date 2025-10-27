const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const usersConmtroller = require("../controllers/users");

router.route("/signup")
    .get(usersConmtroller.signupForm)
    .post(wrapAsync(usersConmtroller.newSignup))

router.route("/login")
    .get(usersConmtroller.loginForm)
    .post(saveRedirectUrl, 
        passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), 
        usersConmtroller.login
    )

router.get("/logout", usersConmtroller.logout);

module.exports = router;