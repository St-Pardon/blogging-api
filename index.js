require("dotenv").config;
const express = require("express");
const { connectToMongoDB } = require("./config/db.config");
const { userRoute } = require("./routes/user.route");
const { postRoute } = require("./routes/post.route");
const { signinRoute, signupRoute } = require("./routes/authentication.route");

// initialize server
const app = express();

// parse body data
app.use(express.json());

app.get("/", (req, res) => {
  res.end(
    "Welcome to your blog, please make req to the /login route to login or to the /blog to get blog article. Thank you!"
  );
});

app
  .use("/users", userRoute)
  .use("/signup", signupRoute)
  .use("/signin", signinRoute)
  .use("/posts", postRoute);

// connect To Mongo DB
connectToMongoDB();
// start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on Localhost:${process.env.PORT}`);
});
