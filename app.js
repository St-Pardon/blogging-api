require("dotenv").config();
const express = require("express");
const { userRoute } = require("./routes/v1/user.route");
const { postRoute } = require("./routes/v1/post.route");
const { signinRoute, signupRoute } = require("./routes/v1/authentication.route");
const { errHandler } = require("./middleware/errhandle.middleware");
require("./middleware/auth.middleware");

// initialize server
const app = express();
const BaseRouteV1 = "/api/v1";
const BaseRouteV2 = "/api/v2";

app
  // body parsing middleware
  .use(express.urlencoded({ extended: false }))
  .use(express.json())

  // routes handlers v1
  .use(`${BaseRouteV1}/users`, userRoute)
  .use(`${BaseRouteV1}/signup`, signupRoute)
  .use(`${BaseRouteV1}/signin`, signinRoute)
  .use(`${BaseRouteV1}/posts`, postRoute)

  // routes handlers v2
  // .use(`${BaseRouteV2}/users`, userRoute)
  // .use(`${BaseRouteV2}/signup`, signupRoute)
  // .use(`${BaseRouteV2}/signin`, signinRoute)
  // .use(`${BaseRouteV2}/posts`, postRoute)

  // error handling middleware
  .use(errHandler)

  // welcome page route
  .get("/", (req, res) => {
    res
      .status(200)
      .end(
        "Welcome to your blog, use version 1 on /api/v1 or version 2 on /api/v2 Thank you!"
      );
  })
  .get(`${BaseRouteV1}`, (req, res) => {
    res
      .status(200)
      .end(
        "Blogging API Version 1, please make req to the /signin route to login or /signup if you don't have an account. explore the /posts to get blog article. Check out API documentation for more routes Thank you!"
      );
  })
  .get(`${BaseRouteV2}`, (req, res) => {
    res
      .status(200)
      .end(
        "Blogging API Version 2, comming soon Thank you!"
      );
  })

  // 404 error page
  .get("*", (req, res) => {
    res.status(404).end("404 not found, check route or method and try again");
  });

module.exports = app;
