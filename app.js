require("dotenv").config();
const express = require("express");
const { userRoute } = require("./routes/user.route");
const { postRoute } = require("./routes/post.route");
const { signinRoute, signupRoute } = require("./routes/authentication.route");
const { errHandler } = require("./middleware/errhandle.middleware");
require("./middleware/auth.middleware");

// initialize server
const app = express();

app
  // body parsing middleware
  .use(express.urlencoded({ extended: false }))
  .use(express.json())

  // routes handlers
  .use("/users", userRoute)
  .use("/signup", signupRoute)
  .use("/signin", signinRoute)
  .use("/posts", postRoute)

  // error handling middleware
  .use(errHandler)

  // welcome page route
  .get("/", (req, res) => {
    res
      .status(200)
      .end(
        "Welcome to your blog, please make req to the /signin route to login or /signup if you don't have an account. explore the /posts to get blog article. Thank you!"
      );
  })

  // 404 error page
  .get("*", (req, res) => {
    res.status(404).end("404 not found, check route and try again");
  });

module.exports = app;
