const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/GoBnB');
}

app.get("/", (req, res)=>{
    res.send("Hi, I am route");
});

// app.get("/testlist", async(req, res)=>{
//     let sampleListing = new Listing({
//         title: "My new villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });
//     await sampleListing.save();
//     console.log("sample was save");
//     res.send("successfuls testing")
// })


// Catch-all for unmatched routes
app.use((req, res, next)=>{
    next(new ExpressError(404, "Page Not Found!"));
});

// Error handler
app.use((err, req, res, next)=>{
    let { status = 500, message = "Something went wrong" } = err;
    res.status(status).render("error.ejs", { err });
    //res.status(status).send(message);
});

app.listen(8080, ()=>{
    console.log("Server is listening to port 8080");
});