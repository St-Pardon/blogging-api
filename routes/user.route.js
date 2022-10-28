const { Router } = require("express");
const { userModel } = require("../models/user.model");
const {} = require("../middleware/");

// intialize router
const userRoute = Router();

userRoute.get("/", (req, res) => {
  userModel
    .find()
    .then((users) => {
      res.status(200).render(users);
    })
    .catch((err) => {
      res.status(404).send(`Users not found -> ${err}`);
    });
});

module.exports = { userRoute };
