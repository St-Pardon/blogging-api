const { Router } = require("express");
const { postModel } = require("../models/post.model");

const postRoute = Router();

// get all post
postRoute
  .get("/", (req, res) => {
    try {
      postModel.find().then((posts) => {
        res.status(200).send(posts);
      });
    } catch (err) {
      res.status(404).send({ msg: "Posts not found", err });
    }
  })

  // get post by id
  .get("/:postid", (req, res) => {
    try {
      const { postid } = req.params;
      postModel.findById(postid).then((post) => {
        res.status(200).send(post);
      });
    } catch (err) {
      res.status(404).send({ msg: "Posts not found", err });
    }
  })

  // create new post
  .post("/new_post", (req, res) => {
    try {
      const newPost = req.body;
      postModel.create(newPost).then((post) => {
        res.status(200).send(post);
      });
    } catch (error) {
      res.status(404).send({ msg: "Cannot create post", error });
    }
  })

  // edit/update post
  .put("/:postid/edit", (req, res) => {
    try {
      const { postid } = req.params;
      const update = req.body;

      // update time
      update.updated_at = new Date();
      postModel
        .findByIdAndUpdate(postid, update, { new: true })
        .then((post) => {
          res.status(200).send(post);
        });
    } catch (error) {
      res.status(404).send({ msg: "Posts not found", error });
    }
  });
module.exports = { postRoute };
