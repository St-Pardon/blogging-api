const { postModel } = require("../models/post.model");
const { userModel } = require("../models/user.model");

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
module.exports.getAll = async (req, res) => {
  try {
    const {
      author = /[a-z]+/gi,
      title = /[a-z]+/gi,
      count = 20,
      page_no = 0,
      filter_by = /[a-z]+/gi,
      order_by = "timestamp",
      sort_by = "ASC",
    } = await req.query;
    const tags =
      (await req.query.tags) === undefined
        ? /[a-z]+/gi
        : req.query.tags.split(" ");

    await postModel
      .find({
        author,
        title,
        state: filter_by,
        tags: { $in: tags },
      })
      .limit(parseInt(count))
      .skip(page_no * count)
      .sort({ [order_by]: sort_by.toLowerCase() })
      .then((posts) => {
        // post with authors name
        const data = posts.map((item) => {
          return { title: item.title, author: item.author, post: item };
        });
        res.status(200).json(data);
      });
  } catch (err) {
    res.status(404).send({ msg: "No post was return", err });
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { postid } = req.params;
    // update read_count
    const blogPost = await postModel.findById(postid);
    blogPost.read_count = (await blogPost.read_count) + 1;
    const userInfo = await userModel.findOne({ userid: blogPost.userid }); //gets userInfo
    await blogPost.save().then((post) => {
      res.status(200).json({
        post,
        firstname: userInfo.first_name,
        lastname: userInfo.last_name,
        email: userInfo.email,
        city: userInfo.city,
      });
    });
  } catch (err) {
    res.status(404).send({ msg: "Posts not found", err });
  }
};

module.exports.userPosts = (req, res) => {
  try {
    const userid = req.user._id;
    postModel.find({ userid }).then((all) => res.status(200).json(all));
  } catch (err) {
    res.status(404).send({ msg: "Posts not found", err });
  }
};

module.exports.new_post = (req, res) => {
  try {
    const newPost = req.body;
    newPost.userid = req.user._id; // set username authomatically from authenticated user
    postModel.create(newPost).then((post) => {
      res.status(200).json(post);
    });
  } catch (error) {
    res.status(404).send({ msg: "Cannot create post", error });
  }
};

module.exports.editPost = (req, res) => {
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
    postModel.findByIdAndUpdate(postid, update, { new: true }).then((post) => {
      res.status(200).json(post);
    });
  } catch (error) {
    res.status(404).send({ msg: "Posts not found", error });
  }
};


module.exports.deletePost = (req, res) => {
  try {
    const { postid } = req.params;

    postModel.findByIdAndDelete(postid).then((post) => {
      res.status(200).send("Deleted successfully");
    });
  } catch (error) {
    res.status(404).send({ msg: "Unable to delete post", error });
  }
};