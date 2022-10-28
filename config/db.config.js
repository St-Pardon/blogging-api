const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongoDB = () =>{
    mongoose.connect(process.env.MONGODB_URI);
    mongoose.connection.on("connected", ()=> console.log("Connection to mongodb atlas successful"))
    mongoose.connection.on('error', (err)=>console.log(`Error connecting to mongodb atlas -> ${err}`))
}

module.exports = { connectToMongoDB };