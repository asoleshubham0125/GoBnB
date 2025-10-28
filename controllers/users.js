const User = require("../models/user");

module.exports.signupForm = (req, res) => {
    res.render("users/signup.ejs")
}

module.exports.newSignup = async(req, res)=>{
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
}

module.exports.loginForm = (req, res)=>{
    res.render("users/login.ejs");
}

module.exports.login = async(req, res)=>{
    req.flash("success","Welcome back to GoBnB");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    if (redirectUrl.includes("/reviews")) {
        // If it is, remove "/reviews" to get the listing's show page URL
        redirectUrl = redirectUrl.split("/reviews")[0]; 
    }
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged out");
        res.redirect("/listings");
    })
}