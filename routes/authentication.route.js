const { Router } = require("express");
const { userModel } = require("../models/user.model");

const signinRoute = Router();
const signupRoute = Router();

signinRoute.post("/", (req, res) => {
  try {
    const user = req.body;
    user.updated_at = new Date();
    userModel.create(user).then((user) => {
      res.status(200).send(user);
    });
  } catch (err) {
    res.status(401).send(`An error occured -> ${err}`);
  }
});

module.exports = { signinRoute, signupRoute };
