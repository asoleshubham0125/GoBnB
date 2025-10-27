const express = require("express");
const router = express.Router({mergeParams: true});

const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewsController = require("../controllers/reviews.js");

// Review Route -> POST Route
router.post("/", 
    isLoggedIn,
    validateReview, 
    wrapAsync(reviewsController.newReview)
);

// Delete review route
router.delete("/:reviewId", 
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewsController.destroyReview)
)

module.exports = router;