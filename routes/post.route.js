const { Router } = require("express");
const passport = require("passport");
const { postModel } = require("../models/post.model");

const postRoute = Router();

/**
 * @query
 * author: Regex for * (default)
 * title: Regex for * (default)
 * tags:  Regex for * (default)
 * filter_by: all(default), published and draft
 * order_by: read_count, reading_time and timestamp (default)
 * sort_by: ASC (default), DESC
 * pagenation: 20 items (default)
 * page_no: 0 (default)
 */
postRoute
  .get("/", (req, res) => {
    try {
      const {
        author = /[a-z]+/gi,
        title = /[a-z]+/gi,
        tags = [/[a-z]+/gi],
        count = 20,
        page_no = 0,
        filter_by = /[a-z]+/gi,
        order_by = "timestamp",
        sort_by = "ASC",
      } = req.query;

      postModel
        .find({ author, title, 'state': filter_by, "tags": { $in: tags.split(" ") }})
        .limit(parseInt(count))
        .skip(page_no * count)
        .sort({ [order_by]: sort_by.toLowerCase() })
        .then((posts) => {
          // post with authors name
          const data = posts.map((item) => {
            return { title: item.title, author: item.author, post: item };
          });
          res.status(200).send(data);
        });
    } catch (err) {
      res.status(404).send({ msg: "Posts not found", err });
    }
  })

  // get post by id
  .get("/:postid", async (req, res) => {
    try {
      const { postid } = req.params;
      // update read_count
      const blogPost = await postModel.findById(postid);
      blogPost.read_count = (await blogPost.read_count) + 1;
      await blogPost.save().then((post) => {
        res.status(200).send(post);
      });
    } catch (err) {
      res.status(404).send({ msg: "Posts not found", err });
    }
  })

  // create new post
  .post(
    "/new_post",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      try {
        const newPost = req.body;
        postModel.create(newPost).then((post) => {
          res.status(200).send(post);
        });
      } catch (error) {
        res.status(404).send({ msg: "Cannot create post", error });
      }
    }
  )

  // edit/update/publish post
  .put(
    "/:postid/edit",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      try {
        const { postid } = req.params;
        const update = req.body;
        const { published = false } = req.params;

        if (published) {
          update.state = update.state === "draft" ? "draft" : "published";
          update.timestamp = new Date();
        } else {
          update.state = update.state === "published" ? "published" : "draft";
          update.timestamp = new Date();
        }
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
    }
  )

  // // publish draft
  // .put(
  //   "/:postid/publish",
  //   passport.authenticate("jwt", { session: false }),
  //   async (req, res) => {
  //     try {
  //       const { postid } = req.params;
  //       const { published } = req.query;
  //       if (published) {
  //         const blogPost = await postModel.findById(postid);
  //         blogPost.state = "published";
  //         blogPost.timestamp = new Date();
  //         blogPost.save().then((post) => {
  //           res.status(200).send(post);
  //         });
  //       } else {
  //         const blogPost = await postModel.findById(postid);
  //         blogPost.state = "draft";
  //         blogPost.timestamp = new Date();
  //         blogPost.save().then((post) => {
  //           res.status(200).send(post);
  //         });
  //       }
  //     } catch (error) {
  //       res.status(404).send({ msg: "Posts not found", error });
  //     }
  //   }
  // )

  // delete post
  .delete(
    "/:postid",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      try {
        const { postid } = req.params;

        postModel.findByIdAndDelete(postid).then((post) => {
          res.status(200).send("Deleted successfully");
        });
      } catch (error) {
        res.status(404).send({ msg: "Unable to delete post", error });
      }
    }
  );

module.exports = { postRoute };
