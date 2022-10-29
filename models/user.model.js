const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// import schema and ObjectId
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

// declears new schema
const UserSchema = new Schema({
  id: ObjectId,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  username: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user_type: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
  city: String,
});


// ensure password is encrypted
UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

// password validation for log in 
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const userModel = model("userModel", UserSchema);
module.exports = { userModel };
