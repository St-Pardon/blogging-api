require("dotenv").config;
const express = require("express");
const { connectToMongoDB } = require("./config/db.config");

// initialize server
const app = express();
// connect To Mongo DB
connectToMongoDB();

app.get("/", (req, res) => {
    res.end(
        "Welcome to your blog, please make req to the /login route to login or to the /blog to get blog article. Thank you!"
        );
    });
    
// start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on Localhost:${process.env.PORT}`);
});
