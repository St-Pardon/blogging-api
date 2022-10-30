const mongoose = require("mongoose");

// declear Schema
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

// init schema
const PostSchema = new Schema({
  id: ObjectId,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  state: {
    type: String,
    default: "draft",
    enum: ["draft", "published"],
  },
  title: { type: String, required: true, unique: true },
  description: String,
  author: String,
  username: { type: String, unique: true, required: true },
  read_count: { type: Number, default: 0 },
  reading_time: String,
  body: String,
  tags: Array,
  timestamp: { type: Date, default: Date.now },
});

const postModel = model("postModel", PostSchema);
module.exports = { postModel };
