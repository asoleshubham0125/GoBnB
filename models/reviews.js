const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        // Use Date.now (function reference) so the timestamp is set at save time
        default: Date.now,
    },
});

module.exports = mongoose.model("Review", reviewSchema);