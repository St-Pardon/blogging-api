const { Router } = require("express");
const passport = require("passport");
const { userModel } = require("../models/user.model");

const signinRoute = Router();
const signupRoute = Router();

signupRoute.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
      res.status(200).json({
        message: "Signup successful",
        user: req.user,
      });
  }
);

signinRoute.post("/", (req, res) => {
  try {
    const user = req.body;
    userModel.create(user).then((user) => {
      res.status(200).send(user);
    });
  } catch (err) {
    res.status(401).send(`An error occured -> ${err}`);
  }
});

module.exports = { signinRoute, signupRoute };
