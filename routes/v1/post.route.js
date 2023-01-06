const { Router } = require("express");
const passport = require("passport");
const {
  getAll,
  getById,
  userPosts,
  new_post,
  editPost,
  deletePost,
} = require("../../controllers/posts.controllers");

const postRoute = Router();

postRoute
  .get("/", getAll)

  // get all post by the authenticated user
  .get("/myposts", passport.authenticate("jwt", { session: false }), userPosts)

  // get post by id
  .get("/:postid", getById)

  // create new post
  .post("/new_post", passport.authenticate("jwt", { session: false }), new_post)

  // edit/update/publish post
  .put(
    "/:postid/edit",
    passport.authenticate("jwt", { session: false }),
    editPost
  )

  // delete post
  .delete(
    "/:postid",
    passport.authenticate("jwt", { session: false }),
    deletePost
  );

module.exports = { postRoute };
