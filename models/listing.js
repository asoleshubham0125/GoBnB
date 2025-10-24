const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: { 
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*cO07EvzWff4X7J6d",
        set: (v) => v === "" ? "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*cO07EvzWff4X7J6d" : v,  
    },
    price: Number,
    location: String,
    country: String
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;