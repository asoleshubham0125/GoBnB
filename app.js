const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")

app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/GoBnB');
}

// Index route
app.get("/listings", async(req, res)=>{
    const allListing = await Listing.find({});
    res.render("./listings/index.ejs",{ allListing });
});

// New Route
app.get("/listings/new", (req, res)=>{
    res.render("./listings/new.ejs");
});

// Show route
app.get("/listings/:id", async(req, res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs", { listing });
});

// Create route
app.post("/listings", async(req, res)=>{
    //let { title, discrption, image, price, country, location} = req.body;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings")
});

// Edit route
app.get("/listings/:id/edit", async(req, res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listing });
});

// Update route
app.put("/listings/:id", async(req, res)=>{
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})  

// Delete route
app.delete("/listings/:id", async(req, res)=>{
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

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

app.listen(8080, ()=>{
    console.log("Server is listening to port 8080");
});