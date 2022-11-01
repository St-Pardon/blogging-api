const { userModel } = require("../models/user.model");

module.exports.getAll = (req, res) => {
  try {
    userModel.find().then((users) => {
      res.status(200).json(users);
    });
  } catch (err) {
    res.status(501).send(`An error occured -> ${err}`);
  }
};

module.exports.getById = (req, res) => {
  try {
    const { userid } = req.params;
    userModel.findById(userid).then((user) => {
      res.status(200).json(user);
    });
  } catch (err) {
    res.status(404).send(`User not found -> ${err}`);
  }
};

module.exports.updateUser = (req, res) => {
  try {
    const { userid } = req.params;
    const update = req.body;

    update.updated_at = new Date();

    userModel
      .findByIdAndUpdate(userid, update, { new: true })
      .then((user) => res.status(200).json(user));
  } catch (err) {
    res.status(404).send(`User not found -> ${err}`);
  }
};
