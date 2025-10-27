const Listing = require("../models/listing");

module.exports.index = async(req, res, next)=>{
    const allListing = await Listing.find({});
    res.render("./listings/index.ejs",{ allListing });
}

module.exports.renderNewForm = (req, res)=>{
    res.render("./listings/new.ejs");
}

module.exports.showListing = async(req, res, next)=>{
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
}

module.exports.createListing = async(req, res, next)=>{
    // debug: log incoming body to diagnose create issues
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success","New listing created!!");
    res.redirect("/listings");
}

module.exports.editListing = async(req, res, next)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!!");
        return res.redirect("/listings");
    }
    req.flash("success","Listing edited successfully!!");
    res.render("./listings/edit.ejs", { listing });
}

module.exports.updateListing = async(req, res, next)=>{
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success","Listing updated successfully!!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async(req, res, next)=>{
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted!!");
    res.redirect("/listings");
}