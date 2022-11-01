const { Router } = require("express");
const { userModel } = require("../models/user.model");
// const {} = require("../middleware/");

// intialize router
const userRoute = Router();

// get all users
userRoute
  .get("/", (req, res) => {
    try {
      userModel.find().then((users) => {
        res.status(200).send(users);
      });
    } catch (err) {
      res.status(501).send(`An error occured -> ${err}`);
    }
  })

  // get user by id

  .get("/:userid", (req, res) => {
    try {
      const { userid } = req.params;
      userModel.findById(userid).then((user) => {
        res.status(200).send(user);
      });
    } catch (err) {
      res.status(404).send(`User not found -> ${err}`);
    }
  })

  // update user infomation
  .put("/:userid/edit", (req, res) => {
    try {
      const { userid } = req.params;
      const update = req.body;

      update.updated_at = new Date();

      userModel
        .findByIdAndUpdate(userid, update, { new: true })
        .then((user) => res.status(200).send(user));
    } catch (err) {
      res.status(404).send(`User not found -> ${err}`);
    }
  });

module.exports = { userRoute };
