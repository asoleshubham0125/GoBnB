const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs")
});

router.post("/signup", 
    wrapAsync(async(req, res)=>{
        try{
            let { username, email, password } = req.body;
            const newUser = new User({email, username});
            let registeredUser = await User.register(newUser, password);
            req.login(registeredUser, (err)=>{
                if(err) {
                    return next(err);
                }
                req.flash("success","Welcome to GoBnB");
                res.redirect("/listings");
            });
        } catch(err) {
            req.flash("error", err.message);
            res.redirect("/signup");
        }
    })
);

router.get("/login", (req, res)=>{
    res.render("users/login.ejs");
});

router.post("/login",
    saveRedirectUrl, 
    passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), 
    async(req, res)=>{
        req.flash("success","Welcome back to GoBnB");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        if (redirectUrl.includes("/reviews")) {
            // If it is, remove "/reviews" to get the listing's show page URL
            redirectUrl = redirectUrl.split("/reviews")[0]; 
        }
        res.redirect(redirectUrl);
    }
);

router.get("/logout", (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged out");
        res.redirect("/listings");
    })
})

module.exports = router;