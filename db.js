const mongoose = require("mongoose");

const mongoDBURI = "mongodb://localhost:27017/spabookings";

async function createDbConnection() {
   try {
    await mongoose.connect(mongoDBURI);
    console.log("Connection established")
   } catch (error) {
    console.log(error.message)
   }
}

module.exports = {
    createDbConnection
};