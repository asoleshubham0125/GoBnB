const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const listingSchema = require("./schema.js");

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

// Function for JOI
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
app.get("/listings", 
    wrapAsync(async(req, res, next)=>{
        const allListing = await Listing.find({});
        res.render("./listings/index.ejs",{ allListing });
    })
);

// New Route
app.get("/listings/new", (req, res)=>{
    res.render("./listings/new.ejs");
});

// Show route
app.get("/listings/:id", 
    wrapAsync(async(req, res, next)=>{
        let { id } = req.params;
        const listing = await Listing.findById(id);
        res.render("./listings/show.ejs", { listing });
    })
);

// Create route with error handler by wrapAsync
app.post("/listings", validateListing,
    wrapAsync(async(req, res, next)=>{
        // debug: log incoming body to diagnose create issues
        console.log('POST /listings body:', req.body);
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
    })
);

// Edit route (no body validation on GET)
app.get("/listings/:id/edit",
    wrapAsync(async(req, res, next)=>{
        let { id } = req.params;
        const listing = await Listing.findById(id);
        res.render("./listings/edit.ejs", { listing });
    })
);

// Update route
app.put("/listings/:id", validateListing,
    wrapAsync(async(req, res, next)=>{
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id, {...req.body.listing});
        res.redirect(`/listings/${id}`);
    })
);  

// Delete route
app.delete("/listings/:id", 
    wrapAsync(async(req, res, next)=>{
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        res.redirect("/listings");
    })
);

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