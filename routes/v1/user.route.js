const { Router } = require("express");
const {
  getAll,
  getById,
  updateUser,
} = require("../../controllers/users.controller");

// intialize router
const userRoute = Router();

// get all users
userRoute
  .get("/", getAll)

  // get user by id

  .get("/:userid", getById)

  // update user infomation
  .put("/:userid/edit", updateUser);

module.exports = { userRoute };
