const mongoose = require("mongoose");
const { schema } = require("../../peza/models/user.models");

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

const userModel = model("userModel", UserSchema);
module.export = { userModel };
