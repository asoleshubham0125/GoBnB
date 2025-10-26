const express = require("express");
const router = express.Router({mergeParams: true});

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");

// Function for JOI to validate reviews
const validateReview = (req, res, next) =>{
    let{error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

// Review Route -> POST Route
router.post("/", validateReview, 
    wrapAsync(async(req, res, next)=>{
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);

        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();

        req.flash("success","New review created!!");

        res.redirect(`/listings/${listing._id}`);
    })
);

// Delete review route
router.delete("/:reviewId", 
    wrapAsync( async(req, res, next)=>{
        let { id, reviewId } = req.params;
        await Listing.findByIdAndUpdate(id, { $pull: {reviews: reviewId}});
        await Review.findByIdAndDelete(reviewId);

        req.flash("success","Review deleted!!");

        res.redirect(`/listings/${id}`);
    })
)

module.exports = router;