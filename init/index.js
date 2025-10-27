const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initdata = require("./data.js");

main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/GoBnB');
}

const initDB = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map(( obj ) => ({...obj, owner: "68fe916b3058133bc1bce66f"}));
    await Listing.insertMany(initdata.data);
    console.log("data was intialized");
}

initDB();