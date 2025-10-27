const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

// Index route
router.get("/", 
    wrapAsync(async(req, res, next)=>{
        const allListing = await Listing.find({});
        res.render("./listings/index.ejs",{ allListing });
    })
);

// New Route
router.get("/new",isLoggedIn, (req, res)=>{
    res.render("./listings/new.ejs");
});

// Show route
router.get("/:id", 
    wrapAsync(async(req, res, next)=>{
        let { id } = req.params;
        const listing = await Listing.findById(id)
            .populate(
                {
                    path: "reviews", 
                    populate: {path: "author"},
                }
            ).populate("owner");
            
        if(!listing){
            req.flash("error","Listing you requested for does not exist!!");
            return res.redirect("/listings");
        }
        res.render("./listings/show.ejs", { listing });
    })
);

// Create route with error handler by wrapAsync
router.post("/", validateListing,
    wrapAsync(async(req, res, next)=>{
        // debug: log incoming body to diagnose create issues
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        await newListing.save();
        req.flash("success","New listing created!!");
        res.redirect("/listings");
    })
);

// Edit route (no body validation on GET)
router.get("/:id/edit", isLoggedIn, isOwner, 
    wrapAsync(async(req, res, next)=>{
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if(!listing){
            req.flash("error","Listing you requested for does not exist!!");
            return res.redirect("/listings");
        }
        req.flash("success","Listing edited successfully!!");
        res.render("./listings/edit.ejs", { listing });
    })
);

// Update route
router.put("/:id", 
    isLoggedIn,
    isOwner, 
    validateListing,
    wrapAsync(async(req, res, next)=>{
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id, {...req.body.listing});
        req.flash("success","Listing updated successfully!!");
        res.redirect(`/listings/${id}`);
    })
);  

// Delete route
router.delete("/:id", 
    isLoggedIn,
    isOwner,
    wrapAsync(async(req, res, next)=>{
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        req.flash("success","Listing deleted!!");
        res.redirect("/listings");
    })
);

module.exports = router;