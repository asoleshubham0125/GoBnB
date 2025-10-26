const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema} = require("../schema.js");

// Function for JOI to validate listing
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    // console.log(result);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

// Index route
router.get("/", 
    wrapAsync(async(req, res, next)=>{
        const allListing = await Listing.find({});
        res.render("./listings/index.ejs",{ allListing });
    })
);

// New Route
router.get("/new", (req, res)=>{
    res.render("./listings/new.ejs");
});

// Show route
router.get("/:id", 
    wrapAsync(async(req, res, next)=>{
        let { id } = req.params;
        const listing = await Listing.findById(id).populate("reviews");
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
        await newListing.save();
        req.flash("success","New listing created!!");
        res.redirect("/listings");
    })
);

// Edit route (no body validation on GET)
router.get("/:id/edit",
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
router.put("/:id", validateListing,
    wrapAsync(async(req, res, next)=>{
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id, {...req.body.listing});
        req.flash("success","Listing updated successfully!!");
        res.redirect(`/listings/${id}`);
    })
);  

// Delete route
router.delete("/:id", 
    wrapAsync(async(req, res, next)=>{
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        req.flash("success","Listing deleted!!");
        res.redirect("/listings");
    })
);

module.exports = router;