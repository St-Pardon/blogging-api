const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signinRoute = Router();
const signupRoute = Router();

signupRoute.post(
  "/",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.status(201).json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

signinRoute.post("/", async (req, res, next) => {
  passport.authenticate("signin", async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        const error = new Error("Username or password is incorrect");
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.status(200).json({ message: "Signin successful", token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = { signinRoute, signupRoute };
